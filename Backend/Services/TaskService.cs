using System.Data.Common;
using System.Security.Cryptography;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Create Task with Security Clearance Checks
        public async Task<TaskCreationResult> CreateTaskAsync(
            int currentUserId, 
            TaskCreateDto request)
        {
            // Check membership and role in one single database trip
            var memberRecord = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == request.ProjectId && pm.UserId == currentUserId);

            if (memberRecord == null)
            {
                return new TaskCreationResult
                {
                    ErrorMessage = "The specified project does not exist, or you are not a member of it!"
                };
            }

            // Guard: Block the request if the user is not an Owner
            if (memberRecord.ProjectRole != "Owner")
            {
                return new TaskCreationResult { IsForbidden = true };
            }

            var nextSortOrder = await _context.Tasks
                .Where(t => t.ProjectId == request.ProjectId)
                .Select(t => (int?)t.SortOrder)
                .MaxAsync() ?? -1;

            var taskItem = new TaskItem
            {
                Title = request.Title,
                Description = request.Description,
                Priority = request.Priority,
                Deadline = request.Deadline,
                Status = "Pending",
                ProjectId = request.ProjectId,
                SortOrder = nextSortOrder + 1
            };

            _context.Tasks.Add(taskItem);
            await _context.SaveChangesAsync();

            return new TaskCreationResult { Task = taskItem };
        }

        // 2. Gather Board Tasks and Roster Data Packages
        public async Task<object?> GetProjectTasksAsync(
            int projectId, 
            int currentUserId)
        {
            // Security Check: Return null if the user does not belong to the project workspace
            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);
            
            if (membership == null) return null;

            var projectTasks = await _context.Tasks
                .AsNoTracking()
                .Include(t => t.Category)
                .Where(t => t.ProjectId == projectId)
                .OrderBy(t => t.Status == "Review Required" ? 0 : 1)
                .ThenBy(t => t.SortOrder)
                .ThenBy(t => t.Id)
                .ToListAsync();

            var teamRoster = await _context.ProjectMembers
                .AsNoTracking()
                .Where(pm => pm.ProjectId == projectId)
                .Select(pm => new
                {
                    userId = pm.UserId,
                    userEmail = pm.User != null ? pm.User.Email : "Unknown User",
                    userName = pm.User != null ? pm.User.Username : "Unknown",
                    projectRole = pm.ProjectRole
                })
                .ToListAsync();

            return new
            {
                role = membership.ProjectRole,
                tasks = projectTasks,
                team = teamRoster
            };
        }

        // 3. Update Task Status with explicit array safety guards
        public async Task<ServiceOutcome> UpdateTaskStatusAsync(
            int taskId, 
            int currentUserId, 
            string newStatus)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return ServiceOutcome.NotFound;

            // Viewer Guard: Fetch their workspace role profile
            var userRole = await _context.ProjectMembers
                .Where(pm => pm.ProjectId == task.ProjectId && pm.UserId == currentUserId)
                .Select(pm => pm.ProjectRole)
                .FirstOrDefaultAsync();

            if (userRole == null) return ServiceOutcome.Forbidden;

            // Viewer Shield: Blocks project members with "Viewer" role unconditionally!
            if ( userRole == "Viewer") return ServiceOutcome.Forbidden;

            // Ensures non-owners can only touch cards assigned directly to them!
            if ( userRole != "Owner" && task.AssignedUserId != currentUserId) return ServiceOutcome.Forbidden;

            var validStatuses = new[] { "Pending", "In Progress", "Review Required", "Completed" };
            if (!validStatuses.Contains(newStatus)) return ServiceOutcome.InvalidStatus;

            task.Status = newStatus;
            await _context.SaveChangesAsync();
            return ServiceOutcome.Success;
        }

        // 4. Delete Task with comprehensive Owner role verification
        public async Task<ServiceOutcome> DeleteTaskAsync(
            int taskId, 
            int currentUserId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return ServiceOutcome.NotFound;

            var isOwner = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == task.ProjectId && pm.UserId == currentUserId && pm.ProjectRole == "Owner");

            if (!isOwner) return ServiceOutcome.Forbidden;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return ServiceOutcome.Success;
        }

        // 5. Assign Team Members to Tasks
        public async Task<ServiceOutcome> AssignTaskAsync(
            int taskId, 
            int currentUserId, 
            int? assignedUserId)
        {
            var taskItem = await _context.Tasks.FindAsync(taskId);
            if (taskItem == null) return ServiceOutcome.NotFound;

            var isOwner = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == taskItem.ProjectId && pm.UserId == currentUserId && pm.ProjectRole == "Owner");

            if (!isOwner) return ServiceOutcome.Forbidden;

            taskItem.AssignedUserId = assignedUserId;
            await _context.SaveChangesAsync();
            return ServiceOutcome.Success;
        }

        // 6. Map Category Tags to Task Items
        public async Task<ServiceOutcome> AssignTaskCategoryAsync(
            int taskId, 
            int currentUserId, 
            int? categoryId)
        {
            var taskItem = await _context.Tasks.FindAsync(taskId);
            if (taskItem == null) return ServiceOutcome.NotFound;

            var membership = await _context.ProjectMembers
                 .FirstOrDefaultAsync(pm => pm.ProjectId == taskItem.ProjectId && pm.UserId == currentUserId);

            // Block explicitly if the user's registered identity role is a Viewer
            if (membership == null || membership.ProjectRole == "Viewer") return ServiceOutcome.Forbidden;

            // Gate passing rule: Must be an Owner OR the exact person assigned to handle this card
            var isAuthorized = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == taskItem.ProjectId && 
                                pm.UserId == currentUserId &&
                                (pm.ProjectRole == "Owner" || taskItem.AssignedUserId == currentUserId));

            if (!isAuthorized) return ServiceOutcome.Forbidden;

            taskItem.CategoryId = categoryId;
            await _context.SaveChangesAsync();
            return ServiceOutcome.Success;
        }

        // 7. Re-order task cards in the same column
        public async Task<ServiceOutcome> ReorderTasksAsync(
            int projectId,
            int currentUserId,
            string status,
            List<int> taskIds)
        {
            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm =>
                    pm.ProjectId == projectId &&
                    pm.UserId == currentUserId);

            if (membership == null || membership.ProjectRole == "Viewer")
            {
                return ServiceOutcome.Forbidden;
            }

            var projectTasks = await _context.Tasks
                .Where(t => 
                    t.ProjectId == projectId &&
                    (
                        status == "In Progress"
                            ? t.Status == "In Progress" || t.Status == "Review Required"
                            : t.Status == status
                    ))
                .ToListAsync();

            if (projectTasks.Count != taskIds.Count)
            {
                return ServiceOutcome.InvalidStatus;
            }

            var projectTaskIds = projectTasks
                .Select(t => t.Id)
                .OrderBy(id => id)
                .ToList();

            var requestedTaskIds = taskIds
                .OrderBy(id => id)
                .ToList();

            if (!projectTaskIds.SequenceEqual(requestedTaskIds))
            {
                return ServiceOutcome.InvalidStatus;
            }

            for (var index = 0; index < taskIds.Count; index++)
            {
                var task = projectTasks.First(t => t.Id == taskIds[index]);
                task.SortOrder = index;
            }

            await _context.SaveChangesAsync();
            
            return ServiceOutcome.Success;
        }
    }
}