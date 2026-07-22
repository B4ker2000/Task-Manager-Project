using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Backend.Controllers
{
    [Authorize] // Protects all task operations
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public TaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost] // POST api/tasks
        [Authorize]
        public async Task<IActionResult> CreateTask(TaskCreateDto request)
        {
            // 1. Extract the current logged-in User ID directly from the token claims
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized(new { message = "Invalid or expired session token!" });
            }

            // 2. Check membership and role in one single database trip
            var memberRecord = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == request.ProjectId && pm.UserId == currentUserId);

            // If no record is found, it means the project doesn't exist OR the user isn't assigned to it!
            if(memberRecord == null)
            {
                return BadRequest("The specified project does not exist, or you are not a member of it!");
            }

            // If the users are a member but not the manager/owner, block them 
            if(memberRecord.ProjectRole != "Owner")
            {
                return Forbid();
            }

            // 3. If all security gates pass, safely map and save the task
            var taskItem = new TaskItem
            {
                Title = request.Title,
                Description = request.Description,
                Priority = request.Priority,
                Deadline = request.Deadline,
                Status = "Pending", // Tasks always start out as Pending
                ProjectId = request.ProjectId
            };

            _context.Tasks.Add(taskItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task created successfully!", taskId = taskItem.Id });
        }

        [HttpGet("project/{projectId}")] // GET api/task/project/1 (Get all tasks for a specific project)
        [Authorize]
        public async Task<IActionResult> GetProjectTasks(int projectId)
        {
            // 1. Extract the current user's ID safely from the secure token claims payload
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized(new { message = "Session expired or invalid token structure." });
            }

            // 2. Fetch all tasks assigned to this project room
            var projectTasks = await _context.Tasks
            .Where(t => t.ProjectId == projectId)
            .ToListAsync();

            // 3. Check what role clearance this user holds in this specific room
            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);

            // Default to "None" if a user somehow sneaked past the board gates entirely!
            string userRoleInProject = membership?.ProjectRole ?? "None";

            // 4. Return an elegant, dual-property response data package out to the frontend layout
            return Ok(new
            {
                role = userRoleInProject, // Tells the frontend if they are "Owner" or "Member"
                tasks = projectTasks    // Sends your task card records array
            });
        }

        [HttpPut("{id}/status")] // PUT api/task/1/status (update the task status)
        public async Task<IActionResult> UpdateTaskStatus(int id, TaskUpdateStatusDto request)
        {
            var task = await _context.Tasks.FindAsync(id);
            if(task == null)
            {
                return NotFound("Task not found.");
            }

            task.Status = request.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task status updated successfully!"});
        }

        [HttpDelete("{id}")]
        [Authorize] // To enforce a clid security login token check!
        public async Task<IActionResult> DeleteTask(int id)
        {
            // 1. Extract the unique User ID safely from the encrypted JWT Token claims
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized(new { message = "Invalid user session token!" });
            }

            // 2. Find the task in the database by its ID
            var task = await _context.Tasks.FindAsync(id);
            // 3. If the task doesn't exist, return a 404 error
            if(task == null)
            {
                return NotFound("Task not found.");
            }

            // Look up the current user's membership clearance for this task's specific project
            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == task.ProjectId && pm.UserId == currentUserId);

            // If the users aren't registered to this project, or if their roles aren't set to "Owner", deny access to delete tasks!
            if(membership == null || membership.ProjectRole != "Owner")
            {
                return Forbid(); // Returns a clean 403 Forbidden status code response package!
            }

            // 4. Remove it from the Entity Framework context and save changes
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            // 5. Return a success message
            return Ok(new { message = "Task deleted successfully!" });
        }
    }
}