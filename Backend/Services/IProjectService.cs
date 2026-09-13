using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{
    public interface IProjectService
    {
        /////////////////////////////// Project  Related \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        Task<int> CreateProjectAsync(int userId, ProjectCreateDto request);
        Task<object> GetMyProjectsAsync(int userId);
        Task<bool> DeleteProjectAsync(int projectId, int currentUserId);
        Task<ServiceOutcome> RemoveProjectMemberAsync(int projectId, int currentUserId, int targetUserId);
        Task<Project?> GetProjectByIdAsync(int projectId);
        Task<string?> GetProjectRoleAsync(int projectId, int userId);
        Task<object> GetProjectMembersAsync(int projectId);

        ////////////////////////////// Invitation Related \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        Task<Invitation?> CreateInvitationAsync(int projectId, int currentUserId, ProjectInviteDto request);
        Task<List<Invitation>> GetPendingInvitationsAsync(int userId);
        Task<bool> AcceptInvitationAsync(int invitationId, int userId);
        Task<bool> DeclineInvitationAsync(int invitationId, int userId);
    }
}