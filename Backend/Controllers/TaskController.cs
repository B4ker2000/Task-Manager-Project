using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Authorize] // Protects all task operations
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost] // POST api/tasks
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto request)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            // Let the service handle checking permission records and saving files
            var result = await _taskService.CreateTaskAsync(currentUserId, request);

            if (result.IsForbidden) return Forbid();
            if (result.ErrorMessage != null) return BadRequest(new { message = result.ErrorMessage });

            return Ok(new { message = "Task created successfully!", taskId = result.Task?.Id });
        }

        [HttpGet("project/{projectId}")] // GET api/task/project/1 (Get all tasks for a specific project)
        public async Task<IActionResult> GetProjectTasks(int projectId)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            // Call service to bundle up roles, task lists, and dropdown teams together
            var workspaceData = await _taskService.GetProjectTasksAsync(projectId, currentUserId);
            if (workspaceData == null) return NotFound(new { message = "Project not found or inaccessible." });

            return Ok(workspaceData);
        }

        [HttpPut("{id}/status")] // PUT api/task/1/status (update the task status)
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] TaskUpdateStatusDto request)
        {
            var outcome = await _taskService.UpdateTaskStatusAsync(id, request.Status);

            return outcome switch
            {
                ServiceOutcome.NotFound => NotFound(new { message = "Task not found." }),
                ServiceOutcome.InvalidStatus => BadRequest(new { message = $"'{request.Status}' is not a valid task status!" }),
               _ => Ok(new { message = "Task status updated successfully!" })
            };
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            var outcome = await _taskService.DeleteTaskAsync(id, currentUserId);
            
            return outcome switch
            {
                ServiceOutcome.NotFound => NotFound(new { message = "Task not found." }),
                ServiceOutcome.Forbidden => Forbid(),
                _ => Ok(new { message = "Task deleted successfully!" })
            };
        }

        [HttpPut("{taskId}/assign")]
        public async Task<IActionResult> AssignTask(int taskId, [FromBody] TaskAssignDto request)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            var outcome = await _taskService.AssignTaskAsync(taskId, currentUserId, request.AssignedUserId);

            return outcome switch
            {
                ServiceOutcome.NotFound => NotFound(new { message = "Task not found!" }),
                ServiceOutcome.Forbidden => Forbid(),
                _ => Ok(new { message = "Task assignment updated successfully!" })
            };
        }

        [HttpPut("{taskId}/category")]
        public async Task<IActionResult> AssignTaskCategory(int taskId, [FromBody] TaskCategoryUpdateDto request)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            var outcome = await _taskService.AssignTaskCategoryAsync(taskId, currentUserId, request.CategoryId);

            return outcome switch
            {
                ServiceOutcome.NotFound => NotFound(new { message = "Task not found." }),
                ServiceOutcome.Forbidden => Forbid(),
                _ => Ok(new { message = "Category tag linked to task successfully!" })
            };
        }

        // Shared helpers to eliminate duplicate boilerplate code
        private bool TryGetUserId(out int userId)
        {
            var claimValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claimValue, out userId);
        }

        private UnauthorizedObjectResult UnauthorizedSession()
        {
            return Unauthorized(new { message = "Invalid or expired session token!" });
        }
    }
}