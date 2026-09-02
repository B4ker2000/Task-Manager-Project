using System.Security.Claims;
using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize] // This locks down EVERY endpoint inside this contoller & Enforces security validation JWT token checks!
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost] // POST api/project
        public async Task<IActionResult> CreateProject([FromBody] ProjectCreateDto request)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();
            
            // Call service to instantiate the project and map creator permissions
            int projectId = await _projectService.CreateProjectAsync(currentUserId, request);

            return Ok(new { message = "Project created successfully!", projectId = projectId });
        }

        [HttpGet] // GET api/project (Retrieves all projects belonging to the logged-in user)
        public async Task<IActionResult> GetMyProjects()
        {
            // Extract the unique User ID safely from the encrypted JWT Token claims
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            // Call service to execute our LINQ layout join queries cleanly
            var projectWithRoles = await _projectService.GetMyProjectsAsync(currentUserId);

            return Ok(projectWithRoles);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            // Call service to wipe the project room alongside its tasks safely
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            var success = await _projectService.DeleteProjectAsync(id, currentUserId);
            if (!success) return NotFound(new { message = "Project not found or you lack Owner rights!" });

            return Ok(new { message = "Project and all its tasks were deleted successfully!" });
        }

        [HttpPost("{projectId}/invite")]
        public async Task<IActionResult> InviteMember(int projectId, [FromBody] ProjectInviteDto request)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            // Offload workspace invite verification logic to service engine
            var result = await _projectService.InviteMemberAsync(projectId, currentUserId, request);

            return result.Outcome switch
            {
                ServiceOutcome.Forbidden => Forbid(),
                ServiceOutcome.NotFound => NotFound(new { message = "No user found with that email address!" }),
                ServiceOutcome.InvalidStatus => BadRequest(new { message = "This user is already a member of this project workspace!" }),
                _ => Ok(new { message = $"User '{result.Username}' successfully added to the project room!" })
            };
        }

        [HttpDelete("{projectId}/members/{targetUserId}")]
        public async Task<IActionResult> RemoveProjectMember(int projectId, int targetUserId)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            // Execute removal rules safely down inside the service
            var outcome = await _projectService.RemoveProjectMemberAsync(projectId, currentUserId, targetUserId);

            bool isKickingSomeoneElse = currentUserId != targetUserId;

            return outcome switch
            {
                ServiceOutcome.NotFound => NotFound(new { message = "Target member record not found in this project room." }),
                ServiceOutcome.Forbidden => Forbid(),
                ServiceOutcome.InvalidStatus => BadRequest(new { message = "You are the sole Owner of this project! Assign another Owner before leaving or delete the project from dashboard." }),
                _ => Ok(new { message = isKickingSomeoneElse ? "Member successfully removed from project." : "You have left the project room safely." })
            };
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null) return NotFound(new { message = "Project not found!" });

            return Ok(project);
        }

        [HttpGet("{id}/role")]
        public async Task<IActionResult> GetProjectRole(int id)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            var role = await _projectService.GetProjectRoleAsync(id, currentUserId);
            if (role == null) return NotFound(new { message = "You are not a member of this project!" });

            return Ok(new { role = role });
        }

        [HttpGet("{id}/members")]
        public async Task<IActionResult> GetProjectMembers(int id)
        {
            if (!TryGetUserId(out int currentUserId)) return UnauthorizedSession();

            var rosterList = await _projectService.GetProjectMembersAsync(id);
            
            return Ok(rosterList);
        }

        // Shared helpers to eliminate duplicate boilerplate code across account verification checkpoints
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