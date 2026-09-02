using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;

        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Handle Project Creation and Member Role Mapping
        public async Task<int> CreateProjectAsync(int userId, ProjectCreateDto request)
        {
            var project = new Project
            {
                Name = request.Name,
                Description = request.Description,
                ProjectManagerId = userId
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            var creatorMembership = new ProjectMember
            {
                ProjectId = project.Id,
                UserId = userId,
                ProjectRole = "Owner"
            };

            _context.ProjectMembers.Add(creatorMembership);
            await _context.SaveChangesAsync();

            return project.Id;
        }

        // 2. Process User Project Lists with LINQ Join Queries
        public async Task<object> GetMyProjectsAsync(int userId)
        {
            var projectWithRoles = await (from pm in _context.ProjectMembers.AsNoTracking()
                                            join p in _context.Projects.AsNoTracking() on pm.ProjectId equals p.Id
                                            where pm.UserId == userId
                                            select new
                                            {
                                                Id = p.Id,
                                                Title = p.Name,
                                                Description = p.Description,
                                                userRole = pm.ProjectRole
                                            }).ToListAsync();
            return projectWithRoles;
        }

        // 3. Cascade Delete Projects and Associated Board Tasks safely
        public async Task<bool> DeleteProjectAsync(int projectId, int currentUserId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            if (project == null) return false;

            // Security gate: Verify requester is the true project creator/owner/manager before destroying records
            var isOwner = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId && pm.ProjectRole == "Owner");

            if (!isOwner) return false;

            var associatedTasks = _context.Tasks.Where(t => t.ProjectId == projectId);
            _context.Tasks.RemoveRange(associatedTasks);

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return true;
        }

        // 4. Handle Workspace Invites and Collateral Integrity Checks
        public async Task<(ServiceOutcome Outcome, string? Username)> InviteMemberAsync(int projectId, int currentUserId, ProjectInviteDto request)
        {
            // 4.1. Security Check: Verify that the current user is an Owner
            var isOwner = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId && pm.ProjectRole == "Owner");

            if (!isOwner)
            {
                return (ServiceOutcome.Forbidden, null);
            }

            // 4.2. User Validation: Search for target colleague by email
            var targetUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.InvitedEmail);
            if (targetUser == null)
            {
                return (ServiceOutcome.NotFound, null);
            }

            // 4.3. Duplicate Check: Ensure user is not already part of the project crew
            var alreadyMember = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == targetUser.Id);

            if (alreadyMember)
            {
                return (ServiceOutcome.InvalidStatus, null); // Using InvalidStatus to represent duplicate payload states
            }

            // 4.4. Success Execution
            var newMembership = new ProjectMember
            {
                ProjectId = projectId,
                UserId = targetUser.Id,
                ProjectRole = request.ProjectRole
            };

            _context.ProjectMembers.Add(newMembership);
            await _context.SaveChangesAsync();

            return (ServiceOutcome.Success, targetUser.Username); // Return the username to display in the success alert
        }

        // 5. Process Workspace Eviction or Voluntary Self-Removal
        public async Task<ServiceOutcome> RemoveProjectMemberAsync(int projectId, int currentUserId, int targetUserId)
        {
            // 5.1. Find target membership record
            var targetMembership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == targetUserId);

            if (targetMembership == null) return ServiceOutcome.NotFound;

            // 5.2. Read authorization clearance roles
            var currentUserRole = await _context.ProjectMembers
                .Where(pm => pm.ProjectId == projectId && pm.UserId == currentUserId)
                .Select(pm => pm.ProjectRole)
                .FirstOrDefaultAsync() ?? "None";

            bool isKickingSomeoneElse = currentUserId != targetUserId;

            // Rule A: Kicking someone else requires Owner clearance
            if (isKickingSomeoneElse && currentUserRole != "Owner")
            {
                return ServiceOutcome.Forbidden;
            }

            // Rule B: Cannot leave voluntarily if you are the last surviving project owner
            if (!isKickingSomeoneElse && currentUserRole == "Owner")
            {
                var ownerCount = await _context.ProjectMembers
                    .CountAsync(pm => pm.ProjectId == projectId && pm.ProjectRole == "Owner");

                if (ownerCount <= 1)
                {
                    return ServiceOutcome.InvalidStatus; // Using InvalidStatus as our block trigger for the SoleOwnerTrap
                }
            }

            // 5.3. METRICS SAFETY CLEANUP: Safely wipe out assigned tasks inside this room without manual loop overheads
            await _context.Tasks
                .Where(t => t.ProjectId == projectId && t.AssignedUserId == targetUserId)
                .ExecuteUpdateAsync(setters => setters.SetProperty(t => t.AssignedUserId, (int?)null));

            // 5.4. Remove record
            _context.ProjectMembers.Remove(targetMembership);
            await _context.SaveChangesAsync();

            return ServiceOutcome.Success;
        }

        // 6. Fetch Single Project Metadata Profile
        public async Task<Project?> GetProjectByIdAsync(int projectId)
        {
            return await _context.Projects.AsNoTracking().FirstOrDefaultAsync(p => p.Id == projectId);
        }

        // 7. Read Current User's Workspace Clearance Role
        public async Task<string?> GetProjectRoleAsync(int projectId, int userId)
        {
            return await _context.ProjectMembers
                .Where(pm => pm.ProjectId == projectId && pm.UserId == userId)
                .Select(pm => pm.ProjectRole)
                .FirstOrDefaultAsync();
        }

        // 8. Extract Project Room's Registered Roster Directory
        public async Task<object> GetProjectMembersAsync(int projectId)
        {
            return await _context.ProjectMembers
                .AsNoTracking()
                .Where(pm => pm.ProjectId == projectId)
                .Select(pm => new
                {
                    UserId = pm.UserId,
                    UserEmail = pm.User != null ? pm.User.Email : "Unknown",
                    ProjectRole = pm.ProjectRole
                })
                .ToListAsync();
        }
    }
}