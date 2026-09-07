using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize] // Protects all task operations
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly IUserContextService _userContext;
        
        public TaskController(ITaskService taskService, IUserContextService userContext)
        {
            _taskService = taskService;
            _userContext = userContext;
        }

        [HttpPost] // POST api/tasks
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();
            if (currentUserId == null) return UnauthorizedSession();

            // Let the service handle checking permission records and saving files
            var result = await _taskService.CreateTaskAsync(currentUserId.Value, request);

            if (result.IsForbidden) return Forbid();
            if (result.ErrorMessage != null) return BadRequest(new { message = result.ErrorMessage });

            return Ok(new { message = "Task created successfully!", taskId = result.Task?.Id });
        }

        [HttpGet("project/{projectId}")] // GET api/task/project/1 (Get all tasks for a specific project)
        public async Task<IActionResult> GetProjectTasks(int projectId)
        {
            var currentUserId = _userContext.GetCurrentUserId();
            if (currentUserId == null) return UnauthorizedSession();

            // Call service to bundle up roles, task lists, and dropdown teams together
            var workspaceData = await _taskService.GetProjectTasksAsync(projectId, currentUserId.Value);
            if (workspaceData == null) return NotFound(new { message = "Project not found or inaccessible." });

            return Ok(workspaceData);
        }

        [HttpPut("{id}/status")] // PUT api/task/1/status (update the task status)
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] TaskUpdateStatusDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();
            if (currentUserId == null) return UnauthorizedSession();

            var outcome = await _taskService.UpdateTaskStatusAsync(id, currentUserId.Value, request.Status);

            return outcome switch
            {
                ServiceOutcome.NotFound => NotFound(new { message = "Task not found." }),
                ServiceOutcome.Forbidden => Forbid(), // Returns 403 instantly if a Viewer attempts to change status!
                ServiceOutcome.InvalidStatus => BadRequest(new { message = $"'{request.Status}' is not a valid task status!" }),
               _ => Ok(new { message = "Task status updated successfully!" })
            };
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var currentUserId = _userContext.GetCurrentUserId();
            if (currentUserId == null) return UnauthorizedSession();

            var outcome = await _taskService.DeleteTaskAsync(id, currentUserId.Value);
            
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
            var currentUserId = _userContext.GetCurrentUserId();
            if (currentUserId == null) return UnauthorizedSession();

            var outcome = await _taskService.AssignTaskAsync(taskId, currentUserId.Value, request.AssignedUserId);

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
            var currentUserId = _userContext.GetCurrentUserId();
            if (currentUserId == null) return UnauthorizedSession();

            var outcome = await _taskService.AssignTaskCategoryAsync(taskId, currentUserId.Value, request.CategoryId);

            return outcome switch
            {
                ServiceOutcome.NotFound => NotFound(new { message = "Task not found." }),
                ServiceOutcome.Forbidden => Forbid(),
                _ => Ok(new { message = "Category tag linked to task successfully!" })
            };
        }

        private UnauthorizedObjectResult UnauthorizedSession()
        {
            return Unauthorized(new { message = "Invalid or expired session token!" });
        }
    }
}