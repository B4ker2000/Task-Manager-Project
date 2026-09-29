using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize] // Enforces security validation JWT token checks!
    [ApiController]
    [Route("api/project")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IUserContextService _userContext;

        public ProjectController(IProjectService projectService, IUserContextService userContext)
        {
            _projectService = projectService;
            _userContext = userContext;
        }

        [HttpPost] // POST api/project
        public async Task<IActionResult> CreateProject([FromBody] ProjectCreateDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();
            
            // Call service to instantiate the project and map creator permissions
            int projectId = await _projectService.CreateProjectAsync(currentUserId, request);

            return StatusCode(201, new { message = "Project created successfully!", projectId = projectId });
        }

        [HttpGet] // GET api/project
        public async Task<IActionResult> GetMyProjects()
        {
            var currentUserId = _userContext.GetCurrentUserId();

            // Call service to execute our LINQ layout join queries cleanly
            var projectWithRoles = await _projectService.GetMyProjectsAsync(currentUserId);

            return Ok(projectWithRoles);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _projectService.DeleteProjectAsync(id, currentUserId);

            return Ok(new { message = "Project and all its tasks were deleted successfully!" });
        }

        [HttpDelete("{projectId}/members/{targetUserId}")]
        public async Task<IActionResult> RemoveProjectMember(int projectId, int targetUserId)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _projectService.RemoveProjectMemberAsync(projectId, currentUserId, targetUserId);

            var message = currentUserId != targetUserId
                ? "Member successfully removed from project." 
                : "You have left the project room safely.";

            return Ok(new { message = message });
        }

        [HttpPost("{projectId}/invitations")]
        public async Task<IActionResult> CreateInvitation(
            int projectId,
            [FromBody] ProjectInviteDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _projectService.CreateInvitationAsync(
                projectId,
                currentUserId,
                request);

            return Ok(new
            {
                message = "Invitation created successfully."
            });
        }

        [HttpGet("invitations/pending")]
        public async Task<IActionResult> GetPendingInvitations()
        {
            var currentUserId = _userContext.GetCurrentUserId();

            var invitations = await _projectService
                .GetPendingInvitationsAsync(currentUserId);

            return Ok(invitations);
        }

        [HttpPost("invitations/{invitationId}/accept")]
        public async Task<IActionResult> AcceptInvitation(int invitationId)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _projectService.AcceptInvitationAsync(invitationId, currentUserId);

            return Ok(new { message = "Invitation accepted successfully." });
        }

        [HttpPost("invitations/{invitationId}/decline")]
        public async Task<IActionResult> DeclineInvitation(int invitationId)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _projectService.DeclineInvitationAsync(invitationId, currentUserId);
            
            return Ok(new { message  = "Invitation declined successfully." });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);

            return Ok(project);
        }

        [HttpGet("{id}/role")]
        public async Task<IActionResult> GetProjectRole(int id)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            var role = await _projectService.GetProjectRoleAsync(id, currentUserId);

            return Ok(new { role = role });
        }

        [HttpGet("{id}/members")]
        public async Task<IActionResult> GetProjectMembers(int id)
        {
            var rosterList = await _projectService.GetProjectMembersAsync(id);
            
            return Ok(rosterList);
        }

        [HttpPut("user-preferences/project-order")]
        public async Task<IActionResult> UpdateUserProjectPreferences([FromBody] ProjectOrderUpdateDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _projectService.UpdateUserProjectPreferencesAsync(currentUserId, request.OrderedProjectIds);
            return NoContent();
        }
    }
}