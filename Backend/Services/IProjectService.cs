using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{
    public interface IProjectService
    {
        Task<int> CreateProjectAsync(int userId, ProjectCreateDto request);
        Task<object> GetMyProjectsAsync(int userId);
        Task<bool> DeleteProjectAsync(int projectId);
        Task<string> InviteMemberAsync(int projectId, int currentUserId, ProjectInviteDto request);
        Task<string> RemoveProjectMemberAsync(int projectId, int currentUserId, int targetUserId);
        Task<Project?> GetProjectByIdAsync(int projectId);
        Task<string?> GetProjectRoleAsync(int projectId, int userId);
        Task<object> GetProjectMembersAsync(int projectId);
    }
}