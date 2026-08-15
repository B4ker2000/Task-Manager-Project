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
        public async Task<TaskCreationResult> CreateTaskAsync(int currentUserId, TaskCreateDto request)
        {
            // Check membership and role in one single database trip
            var memberRecord = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == request.ProjectId && pm.UserId == currentUserId);

            if(memberRecord == null)
            {
                return new TaskCreationResult
                {
                    ErrorMessage = "The specified project does not exist, or you are not a member of it!"
                };
            }

            if(memberRecord.ProjectRole != "Owner")
            {
                return new TaskCreationResult { IsForbidden = true };
            }

            var taskItem = new TaskItem
            {
                Title = request.Title,
                Description = request.Description,
                Priority = request.Priority,
                Deadline = request.Deadline,
                Status = "Pending",
                ProjectId = request.ProjectId
            };

            _context.Tasks.Add(taskItem);
            await _context.SaveChangesAsync();

            return new TaskCreationResult { Task = taskItem };
        }

        // 2. Gather Board Tasks and Roster Data Packages
        public async Task<object> GetProjectTasksAsync(int projectId, int currentUserId)
        {
            var projectTasks = await _context.Tasks
                .Include(t => t.Category)
                .Where(t => t.ProjectId == projectId)
                .ToListAsync();

            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);

            string userRoleInProject = membership?.ProjectRole ?? "None";

            var teamRoster = await _context.ProjectMembers
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
                role = userRoleInProject,
                tasks = projectTasks,
                team = teamRoster
            };
        }

        // 3. Update Task Status with explicit array safety guards
        public async Task<string> UpdateTaskStatusAsync(int taskId, string newStatus)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if(task == null) return "NotFound";

            var validStatuses = new[] { "Pending", "In Progress", "Review Required", "Completed" };
            if(!validStatuses.Contains(newStatus)) return "InvalidStatus";

            task.Status = newStatus;
            await _context.SaveChangesAsync();
            return "Success";
        }

        // 4. Delete Task with comprehensive Owner role verification
        public async Task<string> DeleteTaskAsync(int taskId, int currentUserId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if(task == null) return "NotFound";

            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == task.ProjectId && pm.UserId == currentUserId);

            if(membership == null || membership.ProjectRole != "Owner") return "Forbidden";

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return "Success";
        }

        // 5. Assign Team Members to Tasks
        public async Task<string> AssignTaskAsync(int taskId, int currentUserId, int? assignedUserId)
        {
            var taskItem = await _context.Tasks.FindAsync(taskId);
            if (taskItem == null) return "NotFound";

            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == taskItem.ProjectId && pm.UserId == currentUserId);

            if (membership == null || membership.ProjectRole != "Owner") return "Forbidden";

            taskItem.AssignedUserId = assignedUserId;
            await _context.SaveChangesAsync();
            return "Success";
        }

        // 6. Map Category Tags to Task Items
        public async Task<string> AssignTaskCategoryAsync(int taskId, int currentUserId, int? categoryId)
        {
            var taskItem = await _context.Tasks.FindAsync(taskId);
            if(taskItem == null) return "NotFound";

            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == taskItem.ProjectId && pm.UserId == currentUserId);

            // Gate passing rule: Must be an Owner OR the exact person assigned to handle this card
            if(membership == null || (membership.ProjectRole != "Owner" && taskItem.AssignedUserId != currentUserId))
            {
                return "Forbidden";
            }

            taskItem.CategoryId = categoryId;
            await _context.SaveChangesAsync();
            return "Success";
        }
    }
}