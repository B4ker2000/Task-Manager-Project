using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{
    public class TaskCreationResult
    {
        public TaskItem? Task { get; set; }
        public string? ErrorMessage { get; set; }
        public bool IsForbidden { get; set; }
    }

    public interface ITaskService
    {
        Task<TaskCreationResult> CreateTaskAsync(int currentUserId, TaskCreateDto request);
        Task<object?> GetProjectTasksAsync(int projectId, int currentUserId);
        Task<ServiceOutcome> UpdateTaskStatusAsync(int taskId, string newStatus);
        Task<ServiceOutcome> DeleteTaskAsync(int taskId, int currentUserId);
        Task<ServiceOutcome> AssignTaskAsync(int taskId, int currentUserId, int? assignedUserId);
        Task<ServiceOutcome> AssignTaskCategoryAsync(int taskId, int currentUserId, int? categoryId);
    }
}