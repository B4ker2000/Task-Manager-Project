using System.Security.Claims;
using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Authorize] // This locks down EVERY endpoint inside this contoller & Enforces security validation JWT token checks!
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost] // POST api/project
        public async Task<IActionResult> CreateProject(ProjectCreateDto request)
        {
            // 1. Extract the User ID out of their unique JWT Tokens
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if(userIdClaim == null)
            {
                return Unauthorized("User identity could not be verified from token!");
            }

            int userId = int.Parse(userIdClaim.Value);
            
            // 2. Map the DTO data to our database Project model
            var project = new Project
            {
              Name = request.Name,
              Description = request.Description,
              ProjectManagerId = userId // Set thelogged-in user as the manager!  
            };

            // 3. Save to database
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            // Junction engine binding block!
            var creatorMembership = new ProjectMember
            {
                ProjectId = project.Id,
                UserId = userId,
                ProjectRole = "Owner"
            };

            // Saves the mapping relationship data row securely!
            _context.ProjectMembers.Add(creatorMembership);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Project created successfully!", projectId = project.Id });
        }

        [HttpGet] // GET api/project (Retrieves all projects belonging to the logged-in user)
        public async Task<IActionResult> GetMyProjects()
        {
            // 1. Extract the unique User ID safely from the encrypted JWT Token claims
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if(userIdClaim == null) return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            // 2. Query the ProjectMembers table to find All project IDs this specific user belongs to plus the user role!
            var projectWithRoles = await (from pm in _context.ProjectMembers
                                            join p in _context.Projects on pm.ProjectId equals p.Id
                                            where pm.UserId == userId
                                            select new
                                            {
                                                Id = p.Id,
                                                Title = p.Name,
                                                Description = p.Description,
                                                userRole = pm.ProjectRole
                                            }).ToListAsync();

            return Ok(projectWithRoles);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            // 1. Find the project in the database
            var project = await _context.Projects.FindAsync(id);
            if(project == null)
            {
                return NotFound(new { message = "Project not found!" });
            }

            // 2. Fetch and remove all tasks tied to this project first
            var associatedTasks = _context.Tasks.Where(t => t.ProjectId == id);
            _context.Tasks.RemoveRange(associatedTasks);

            // 3. Now it is completely safe to delete the project itself
            _context.Projects.Remove(project);

            // 4. Save everything to the datatbase file in a single transaction
            await _context.SaveChangesAsync();

            return Ok(new { message = "Project and all its tasks were deleted successfully!" });
        }

        [HttpPost("{projectId}/invite")]
        public async Task<IActionResult> InviteMember(int projectId, [FromBody] ProjectInviteDto request)
        {
            // 1. Extract the current logged-in User's unique ID directly from their token claims
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized(new { message = "Invalid or expired session token!" });
            }

            // 2. Security Check: Verify that the current user is actually the Owner/Manager of this project!
            var currentMemberRecord = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);

            if(currentMemberRecord == null || currentMemberRecord.ProjectRole != "Owner")
            {
                return Forbid(); // Blocks non-owners from adding people! (403 Forbidden)
            }

            // 3. User Validation: Search for the target colleague in the system database using their unique email!
            var targetUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.InvitedEmail);
            if(targetUser == null)
            {
                return NotFound(new { message = "No user found with that email address!" });
            }

            // 4. Duplicate Check: Ensure this target colleague isn't already added to this specific project room!
            var alreadyMember = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == targetUser.Id);

            if(alreadyMember)
            {
                return BadRequest(new { message = "This user is already a member of this project workspace!" });
            }

            // 5. Success Execution: Add the new user into your ProjectMembers relational junction table!
            var newMembership = new ProjectMember
            {
                ProjectId = projectId,
                UserId = targetUser.Id,
                ProjectRole = request.ProjectRole
            };

            _context.ProjectMembers.Add(newMembership);
            await _context.SaveChangesAsync(); // Commit the new row securely to our SQLite file layout!

            return Ok(new { message = $"User '{targetUser.Username}' successfully added to the project room!" });
        }

        [HttpDelete("{projectId}/members/{targetUserId}")]
        public async Task<IActionResult> RemoveProjectMember(int projectId, int targetUserId)
        {
            // 1. Extract the current logged-in user ID safely from token claims
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized();
            }

            // 2. Find the target user's membership row inside this specific project room 
            var targetMembership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == targetUserId);

            if(targetMembership == null)
            {
                return NotFound(new { message = "Target member record not found in this project room." });
            }

            // 3. SECURITY GATE CHECK: Check what role clearance the current user holds
            var currentUserMembership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);

            string currentUserRole = currentUserMembership?.ProjectRole ?? "None";

            // Scenario A: If kicking someone else, you MUST be an Owner/Admin
            // Scenario B: If leaving yourself, you are allowed (unless you are the last Owner!)
            bool isKickingSomeoneElse = currentUserId != targetUserId;

            if(isKickingSomeoneElse && currentUserRole != "Owner")
            {
                return Forbid(); // Blocks regular members from kicking people!
            }

            if(!isKickingSomeoneElse && currentUserRole == "Owner")
            {
                // Safety check: Prevent the primary owner from leaving accidentally, trapping the project!
                var ownerCount = await _context.ProjectMembers
                    .CountAsync(pm => pm.ProjectId == projectId && pm.ProjectRole == "Owner");
                
                if(ownerCount <= 1)
                {
                    return BadRequest(new { message = "You are the sole Owner of this project! Assign another Owner before leaving." });
                }
            }

            // 4. METRICS SAFETY CLEANUP: Nullify any tasks assigned to this user inside this project room!
            var assignedTasks = await _context.Tasks
                .Where(t => t.ProjectId == projectId && t.AssignedUserId == targetUserId)
                .ToListAsync();

            foreach(var task in assignedTasks)
            {
                task.AssignedUserId = null; // Clears the assignee so the task board doesn't crash!
            }

            // 5. Remove the membership record row and save changes
            _context.ProjectMembers.Remove(targetMembership);
            await _context.SaveChangesAsync();

            return Ok(new { message = isKickingSomeoneElse ? "Member successfully removed from project." : "You have left the project room safely." });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
            if(project == null)
            {
                return NotFound(new { message = "Project not found!" });
            }
            return Ok(project);
        }

        [HttpGet("{id}/role")]
        public async Task<IActionResult> GetProjectRole(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if(userIdClaim == null) return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var memberRecord = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == id && pm.UserId == userId);

            if(memberRecord == null)
            {
                return NotFound(new { message = "You are not a member of this project!" });
            }

            return Ok(new { role = memberRecord.ProjectRole });
        }

        [HttpGet("{id}/members")]
        public async Task<IActionResult> GetProjectMembers(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if(userIdClaim == null) return Unauthorized();

            var rosterList = await _context.ProjectMembers
                .Where(pm => pm.ProjectId == id)
                .Select(pm => new
                {
                    UserId = pm.UserId,
                    // UserEmail = pm.User != null ? pm.User.Email : "Unkown User", // If Email is somehow ends up being NULL declare it "Unkown User"
                    UserEmail = pm.User!.Email, // "!" means that user Emails cannot be NULL so if it somehow end up being NULL it'll send an error (To put it more simply it's basically telling C#: "Trust me, I know what I'm doing, this won't be null!)
                    ProjectRole = pm.ProjectRole
                })
                .ToListAsync();
            
            return Ok(rosterList);
        }
    }
}