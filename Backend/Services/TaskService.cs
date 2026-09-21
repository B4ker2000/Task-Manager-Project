using System.Data.Common;
using System.Security.Cryptography;
using Backend.Data;
using Backend.Dtos;
using Backend.Exceptions;
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
        public async Task<TaskItem> CreateTaskAsync(
            int currentUserId, 
            TaskCreateDto request)
        {
            // Check membership and role in one single database trip
            var memberRecord = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == request.ProjectId && pm.UserId == currentUserId)
                ?? throw new ForbiddenException("You are not part of this project's crew!");

            // Guard: Block the request if the user is not an Owner
            if (memberRecord.ProjectRole != "Owner")
            {
                throw new ForbiddenException("Only project Owners/Co-Owners can create tasks.");
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

            // Return the fully tracked object with its newly generated ID
            return taskItem;
        }

        // 2. Gather Board Tasks and Roster Data Packages
        public async Task<object> GetProjectTasksAsync(
            int projectId, 
            int currentUserId)
        {
            // Security Check: Throws NotFoundException directly if user doesn't belong to the workspace
            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId)
                ?? throw new NotFoundException("Project not found or inaccessible.");

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
        public async Task UpdateTaskStatusAsync(
            int taskId, 
            int currentUserId, 
            string newStatus)
        {
            var task = await _context.Tasks.FindAsync(taskId)
                ?? throw new NotFoundException("Task not found.");

            // Viewer Guard: Fetch their workspace role profile
            var userRole = await _context.ProjectMembers
                .Where(pm => pm.ProjectId == task.ProjectId && pm.UserId == currentUserId)
                .Select(pm => pm.ProjectRole)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException("User not found or inaccessible.");

            // Viewer Shield: Blocks project members with "Viewer" role unconditionally!
            if (userRole == "Viewer") 
                throw new ForbiddenException("Viewers can only watch the project progress.");

            // Ensures non-owners can only touch cards assigned directly to them!
            if (userRole != "Owner" && task.AssignedUserId != currentUserId) 
                throw new ForbiddenException("You are not an owner or assigned to this task.");

            var validStatuses = new[] { "Pending", "In Progress", "Review Required", "Completed" };
            
            if (!validStatuses.Contains(newStatus))
                throw new BadRequestException($"'{newStatus}' is not a valid task status.");

            task.Status = newStatus;
            await _context.SaveChangesAsync();
        }

        // 4. Delete Task with comprehensive Owner role verification
        public async Task DeleteTaskAsync(
            int taskId, 
            int currentUserId)
        {
            var task = await _context.Tasks.FindAsync(taskId)
                ?? throw new NotFoundException("Task not found.");

            var isOwner = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == task.ProjectId && pm.UserId == currentUserId && pm.ProjectRole == "Owner");
            if (!isOwner) 
                throw new ForbiddenException("You do not have Owner privileges.");

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }

        // 5. Assign Team Members to Tasks
        public async Task AssignTaskAsync(
            int taskId, 
            int currentUserId, 
            int? assignedUserId)
        {
            var taskItem = await _context.Tasks.FindAsync(taskId)
                ?? throw new NotFoundException("Task Item not found.");

            var isOwner = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == taskItem.ProjectId && pm.UserId == currentUserId && pm.ProjectRole == "Owner");

            if (!isOwner) 
                throw new ForbiddenException("You do not have Owner privileges.");

            taskItem.AssignedUserId = assignedUserId;
            await _context.SaveChangesAsync();
        }

        // 6. Map Category Tags to Task Items
        public async Task AssignTaskCategoryAsync(
            int taskId, 
            int currentUserId, 
            int? categoryId)
        {
            var taskItem = await _context.Tasks.FindAsync(taskId)
                ?? throw new NotFoundException("Task Item not found.");

            var membership = await _context.ProjectMembers
                 .FirstOrDefaultAsync(pm => pm.ProjectId == taskItem.ProjectId && pm.UserId == currentUserId);

            // Block explicitly if the user's registered identity role is a Viewer
            if (membership == null || membership.ProjectRole == "Viewer") 
                throw new ForbiddenException("Viewers cannot modify task categories.");

            // Gate passing rule: Must be an Owner OR the exact person assigned to handle this card
            var isAuthorized = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == taskItem.ProjectId && 
                                pm.UserId == currentUserId &&
                                (pm.ProjectRole == "Owner" || taskItem.AssignedUserId == currentUserId));

            if (!isAuthorized) 
                throw new ForbiddenException("You must be an owner or assigned to this task to update its category.");

            taskItem.CategoryId = categoryId;
            await _context.SaveChangesAsync();
        }

        // 7. Re-order task cards in the same column
        public async Task ReorderTasksAsync(
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
                throw new ForbiddenException("Viewers do not have permission to reorder task layouts.");

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
                throw new BadRequestException("The submitted task reordering list counts mismatch the server workspace.");

            var projectTaskIds = projectTasks
                .Select(t => t.Id)
                .OrderBy(id => id)
                .ToList();

            var requestedTaskIds = taskIds
                .OrderBy(id => id)
                .ToList();

            if (!projectTaskIds.SequenceEqual(requestedTaskIds))
                throw new BadRequestException("The submitted task collection sequence contains invalid references.");

            for (var index = 0; index < taskIds.Count; index++)
            {
                var task = projectTasks.First(t => t.Id == taskIds[index]);
                task.SortOrder = index;
            }

            await _context.SaveChangesAsync();
        }
    }
}