using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{

    public interface ITaskService
    {
        Task<TaskItem> CreateTaskAsync(
            int currentUserId, 
            TaskCreateDto request);
        
        Task<object> GetProjectTasksAsync(
            int projectId, 
            int currentUserId);

        Task UpdateTaskStatusAsync(
            int taskId, 
            int currentUserId, 
            string newStatus);
        
        Task DeleteTaskAsync(
            int taskId, 
            int currentUserId);
        
        Task AssignTaskAsync(
            int taskId, 
            int currentUserId, 
            int? assignedUserId);
        
        Task AssignTaskCategoryAsync(
            int taskId, 
            int currentUserId, 
            int? categoryId);
        
        Task ReorderTasksAsync(
            int projectId,
            int currentUserId,
            string status,
            List<int> taskIds);
    }
}