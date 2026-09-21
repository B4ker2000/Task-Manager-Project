using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetCategoriesByProjectAsync(int projectId);
        Task<Category> CreateCategoryAsync(int projectId, int userId, CategoryCreateDto dto);
        Task DeleteCategoryAsync(int projectId, int categoryId, int userId);
    }
}