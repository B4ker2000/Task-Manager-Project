using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize] // Protects all task operations
    [ApiController]
    [Route("api/task")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly IUserContextService _userContext;
        
        public TaskController(ITaskService taskService, IUserContextService userContext)
        {
            _taskService = taskService;
            _userContext = userContext;
        }

        [HttpPost] // POST api/task
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            var createdTask = await _taskService.CreateTaskAsync(currentUserId, request);

            return StatusCode(201, new {
                Message = "Task created successfully!",
                TaskId = createdTask.Id
            });
        }

        [HttpGet("project/{projectId}")] // GET api/task/project/1 (Get all tasks for a specific project)
        public async Task<IActionResult> GetProjectTasks(int projectId)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            var workspaceData = await _taskService.GetProjectTasksAsync(projectId, currentUserId);

            return Ok(workspaceData);
        }

        [HttpPut("{id}/status")] // PUT api/task/1/status (update the task status)
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] TaskUpdateStatusDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();
            
            await _taskService.UpdateTaskStatusAsync(id, currentUserId, request.Status);

            return Ok(new { Message = "Task status updated successfully!" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _taskService.DeleteTaskAsync(id, currentUserId);
            
            return Ok(new { message = "Task deleted successfully!" });
        }

        [HttpPut("{taskId}/assign")]
        public async Task<IActionResult> AssignTask(int taskId, [FromBody] TaskAssignDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _taskService.AssignTaskAsync(taskId, currentUserId, request.AssignedUserId);

            return Ok(new { message = "Task assignment updated successfully!" });
        }

        [HttpPut("{taskId}/category")]
        public async Task<IActionResult> AssignTaskCategory(int taskId, [FromBody] TaskCategoryUpdateDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _taskService.AssignTaskCategoryAsync(taskId, currentUserId, request.CategoryId);

            return Ok(new { message = "Category tag linked to task successfully!" });
        }

        [HttpPut("project/{projectId}/reorder")]
        public async Task<IActionResult> ReorderTasks(
            int projectId,
            [FromBody] TaskReorderDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _taskService.ReorderTasksAsync(
                projectId,
                currentUserId,
                request.Status,
                request.TaskIds);

            return Ok(new { message = "Task order updated successfully." });
        }
    }
}