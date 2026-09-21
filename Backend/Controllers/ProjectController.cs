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

            return Ok(new { message = "Project created successfully!", projectId = projectId });
        }

        [HttpGet] // GET api/project (Retrieves all projects belonging to the logged-in user)
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

            var success = await _projectService.DeleteProjectAsync(id, currentUserId);
            if (!success) return NotFound(new { message = "Project not found or you lack Owner rights!" });

            return Ok(new { message = "Project and all its tasks were deleted successfully!" });
        }

        [HttpDelete("{projectId}/members/{targetUserId}")]
        public async Task<IActionResult> RemoveProjectMember(int projectId, int targetUserId)
        {
            var currentUserId = _userContext.GetCurrentUserId();

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

        [HttpPost("{projectId}/invitations")]
        public async Task<IActionResult> CreateInvitation(
            int projectId,
            [FromBody] ProjectInviteDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            var invitation = await _projectService.CreateInvitationAsync(
                projectId,
                currentUserId,
                request);

            if (invitation == null)
            {
                return BadRequest(new
                {
                    message = "The invitation could not be created. Check permissions, membership, or duplicate invitations."
                });
            }

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

            var accepted = await _projectService
                .AcceptInvitationAsync(invitationId, currentUserId);

            if (!accepted)
            {
                return BadRequest(new
                {
                    message = "The invitation could not be accepted."
                });
            }

            return Ok(new
            {
                message = "Invitation accepted successfully."
            });
        }

        [HttpPost("invitations/{invitationId}/decline")]
        public async Task<IActionResult> DeclineInvitation(int invitationId)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            var declined = await _projectService
                .DeclineInvitationAsync(invitationId, currentUserId);
            
            if (!declined)
            {
                return BadRequest(new
                {
                    message = "The invitation could not be declined."
                });
            }

            return Ok(new
            {
                message  = "Invitation declined successfully."
            });
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
            var currentUserId = _userContext.GetCurrentUserId();

            var role = await _projectService.GetProjectRoleAsync(id, currentUserId);
            if (role == null) return NotFound(new { message = "You are not a member of this project!" });

            return Ok(new { role = role });
        }

        [HttpGet("{id}/members")]
        public async Task<IActionResult> GetProjectMembers(int id)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            var rosterList = await _projectService.GetProjectMembersAsync(id);
            
            return Ok(rosterList);
        }
    }
}