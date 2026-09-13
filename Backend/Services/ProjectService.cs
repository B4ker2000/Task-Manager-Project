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

        // 4. Process Workspace Eviction or Voluntary Self-Removal
        public async Task<ServiceOutcome> RemoveProjectMemberAsync(int projectId, int currentUserId, int targetUserId)
        {
            // 4.1. Find target membership record
            var targetMembership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == targetUserId);

            if (targetMembership == null) return ServiceOutcome.NotFound;

            // 4.2. Read authorization clearance roles
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

            // 4.3. METRICS SAFETY CLEANUP: Safely wipe out assigned tasks inside this room without manual loop overheads
            await _context.Tasks
                .Where(t => t.ProjectId == projectId && t.AssignedUserId == targetUserId)
                .ExecuteUpdateAsync(setters => setters.SetProperty(t => t.AssignedUserId, (int?)null));

            // 4.4. Remove record
            _context.ProjectMembers.Remove(targetMembership);
            await _context.SaveChangesAsync();

            return ServiceOutcome.Success;
        }

        // 5. Fetch Single Project Metadata Profile
        public async Task<Project?> GetProjectByIdAsync(int projectId)
        {
            return await _context.Projects.AsNoTracking().FirstOrDefaultAsync(p => p.Id == projectId);
        }

        // 6. Read Current User's Workspace Clearance Role
        public async Task<string?> GetProjectRoleAsync(int projectId, int userId)
        {
            return await _context.ProjectMembers
                .Where(pm => pm.ProjectId == projectId && pm.UserId == userId)
                .Select(pm => pm.ProjectRole)
                .FirstOrDefaultAsync();
        }

        // 7. Extract Project Room's Registered Roster Directory
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

        // 8. Create an invitation with set rules!
        public async Task<Invitation?> CreateInvitationAsync(int projectId, int currentUserId, ProjectInviteDto request)
        {
            var isOwner = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == projectId
                    && pm.UserId == currentUserId
                    && pm.ProjectRole == "Owner");
            
            if (!isOwner) return null;

            var invitedEmail = request.InvitedEmail.Trim().ToLower();

            var existingMember = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == projectId && pm.User != null && pm.User.Email == invitedEmail);
                
            if (existingMember) return null;

            var existingPendingInvite = await _context.Invitations
                .AnyAsync(i => 
                    i.ProjectId == projectId && 
                    i.InvitedEmail == invitedEmail &&
                    i.Status == "Pending");

            if (existingPendingInvite) return null;

            var invitedUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == invitedEmail);

            var invitation = new Invitation
            {
                ProjectId = projectId,
                InvitedEmail = invitedEmail,
                InvitedUserId = invitedUser?.Id,
                InvitedByUserId = currentUserId,
                Status = "Pending",
                ProjectRole = request.ProjectRole,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(7)
            };

            _context.Invitations.Add(invitation);
            await _context.SaveChangesAsync();

            return invitation;
        }
        
        // 9. Method to fetch notifications sent to the current user
        public async Task<List<Invitation>> GetPendingInvitationsAsync(int userId)
        {
            var now = DateTime.UtcNow;

            var pendingInvites = await _context.Invitations
                .Include(i => i.Project)
                .Where(i => i.InvitedUserId == userId && i.Status == "Pending")
                .ToListAsync();

            var expired = pendingInvites
                .Where(i => i.ExpiresAt.HasValue && i.ExpiresAt.Value <= now)
                .ToList();

            foreach (var invitation in expired)
            {
                invitation.Status = "TimedOut";
                invitation.RespondedAt = now;
            }

            if (expired.Count > 0) {
                await _context.SaveChangesAsync();
            }

            return pendingInvites
                   .Where(i => i.Status == "Pending")
                   .ToList();
        }

        // 10. What to do when an invitation is Accepted
        public async Task<bool> AcceptInvitationAsync(int invitationId, int userId)
        {
            var invitation = await _context.Invitations
                .FirstOrDefaultAsync(i => i.Id == invitationId);

            var now = DateTime.UtcNow;

            if (invitation == null) return false;
            if (invitation.InvitedUserId != userId) return false;
            if (invitation.Status != "Pending") return false;
            if (invitation.InvitedUserId == null) return false;
            if (invitation.ExpiresAt.HasValue && invitation.ExpiresAt.Value <= now)
            {
                invitation.Status = "TimedOut";
                invitation.RespondedAt = now;
                await _context.SaveChangesAsync();
                return false;
            }

            var alreadyMember = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == invitation.ProjectId
                                && pm.UserId == invitation.InvitedUserId.Value);

            if (alreadyMember) return false;

            _context.ProjectMembers.Add(new ProjectMember
            {
                ProjectId = invitation.ProjectId,
                UserId = invitation.InvitedUserId.Value, // Nullable UserId so the invitation is displayed to the user later when they actually register!
                ProjectRole = invitation.ProjectRole
            });

            invitation.Status = "Accepted";
            invitation.RespondedAt = now;

            await _context.SaveChangesAsync();
            return true;
        }

        // 11. What to do if the invitaion is declined!
        public async Task<bool> DeclineInvitationAsync(int invitationId, int userId)
        {
            var invitation = await _context.Invitations
                .FirstOrDefaultAsync(i => i.Id == invitationId);
            
            var now = DateTime.UtcNow;
                
            if (invitation == null) return false;
            if (invitation.InvitedUserId != userId) return false;
            if (invitation.Status != "Pending") return false;

            if (invitation.ExpiresAt.HasValue && invitation.ExpiresAt.Value <= now)
            {
                invitation.Status = "TimedOut";
                invitation.RespondedAt = now;
                await _context.SaveChangesAsync();
                return false;
            }

            invitation.Status = "Declined";
            invitation.RespondedAt = now;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}