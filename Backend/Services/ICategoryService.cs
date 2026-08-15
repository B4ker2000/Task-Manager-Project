using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{
    public interface ICategoryService
    {
        // The "?" means this method is allowed to return null if authorization fails
        Task<Category?> CreateCategoryAsync(int projectId, int userId, CategoryCreateDto dto);

        // Returns true if deleted successfully, false if forbidden or not found
        Task<bool> DeleteCategoryAsync(int projectId, int categoryId, int userId);
    }
}