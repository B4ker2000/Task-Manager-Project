using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Authorize] // Protects all task operations
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController: ControllerBase
    {
        private readonly ITaskService _taskService;
        
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost] // POST api/tasks
        public async Task<IActionResult> CreateTask(TaskCreateDto request)
        {
            // Extract the current logged-in User ID directly from the token claims
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized(new { message = "Invalid or expired session token!" });
            }

            // Let the service handle checking permission records and saving files
            var result = await _taskService.CreateTaskAsync(currentUserId, request);

            if(result.IsForbidden) return Forbid();
            if(result.ErrorMessage != null) return BadRequest(result.ErrorMessage);

            return Ok(new { message = "Task created successfully!", taskId = result.Task?.Id });
        }

        [HttpGet("project/{projectId}")] // GET api/task/project/1 (Get all tasks for a specific project)
        public async Task<IActionResult> GetProjectTasks(int projectId)
        {
            // Extract the current user's ID safely from the secure token claims payload
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized(new { message = "Session expired or invalid token structure." });
            }

            // Call service to bundle up roles, task lists, and dropdown teams together
            var workspaceData = await _taskService.GetProjectTasksAsync(projectId, currentUserId);

            return Ok(workspaceData);
        }

        [HttpPut("{id}/status")] // PUT api/task/1/status (update the task status)
        public async Task<IActionResult> UpdateTaskStatus(int id, TaskUpdateStatusDto request)
        {
            var outcome = await _taskService.UpdateTaskStatusAsync(id, request.Status);

            if(outcome == "NotFound") return NotFound("Task not found.");
            if(outcome == "InvalidStatus") return BadRequest(new { message = $"'{request.Status}' is not a valid task status!" });

            return Ok(new { message = "Task status updated successfully!" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            // Extract the unique User ID safely from the encrypted JWT Token claims
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized(new { message = "Invalid user session token!" });
            }

            var outcome = await _taskService.DeleteTaskAsync(id, currentUserId);
            
            if(outcome == "NotFound") return NotFound("Task not found.");
            if(outcome == "Forbidden") return Forbid();

            return Ok(new { message = "Task deleted successfully!" });
        }

        [HttpPut("{taskId}/assign")]
        public async Task<IActionResult> AssignTask(int taskId, [FromBody] TaskAssignDto request)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId)) return Unauthorized();

            var outcome = await _taskService.AssignTaskAsync(taskId, currentUserId, request.AssignedUserId);
            // move these stuff like ```var outcome...``` into services

            if(outcome == "NotFound") return NotFound("Task not found!");
            if(outcome == "Forbidden") return Forbid();
            
            return Ok(new { message = "Task assignment updated successfully!" });
        }

        [HttpPut("{taskId}/category")]
        public async Task<IActionResult> AssignTaskCategory(int taskId, [FromBody] TaskCategoryUpdateDto request)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId)) return Unauthorized();
            
            var outcome = await _taskService.AssignTaskCategoryAsync(taskId, currentUserId, request.CategoryId);
            
            if(outcome == "NotFound") return NotFound("Task not found");
            if(outcome == "Forbidden") return Forbid();

            return Ok(new { message = "Category tag linked to task successfully!" });
        }
    }
}