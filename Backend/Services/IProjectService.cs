using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{
    public interface IProjectService
    {
        /////////////////////////////// Project  Related \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        Task<int> CreateProjectAsync(int userId, ProjectCreateDto request);
        Task<object> GetMyProjectsAsync(int userId);
        Task DeleteProjectAsync(int projectId, int currentUserId);
        Task RemoveProjectMemberAsync(int projectId, int currentUserId, int targetUserId);
        Task<Project> GetProjectByIdAsync(int projectId);
        Task<string> GetProjectRoleAsync(int projectId, int userId);
        Task<object> GetProjectMembersAsync(int projectId);

        ////////////////////////////// Invitation Related \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        Task CreateInvitationAsync(int projectId, int currentUserId, ProjectInviteDto request);
        Task<List<Invitation>> GetPendingInvitationsAsync(int userId);
        Task AcceptInvitationAsync(int invitationId, int userId);
        Task DeclineInvitationAsync(int invitationId, int userId);
    }
}