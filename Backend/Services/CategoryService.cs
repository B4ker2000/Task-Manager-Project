using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetCategoriesByProjectAsync(int projectId)
        {
            return await _context.Categories
                .Where(c => c.ProjectId == projectId)
                .AsNoTracking() // Keeps RAM usage ultra-low for simple fetches!
                .ToListAsync();
        }

        public async Task<Category?> CreateCategoryAsync(int projectId, int userId, CategoryCreateDto dto)
        {
            // Guard Clause: Protect against bad payloads breaking string manipulation (.Trim())
            if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.ColorHex))
            {
                return null;
            }

            // 1. Verify Authorization: Only Project Owners/Managers can create categories
            var membership = await _context.ProjectMembers
                .AsNoTracking()
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

            if (membership == null || membership.ProjectRole != "Owner")
            {
                // Returning null lets our controller know authorization failed or was forbidden
                return null;
            }

            // 2. Build the new category object
            var newCategory = new Category
            {
                Name = dto.Name.Trim(),
                ColorHex = dto.ColorHex.Trim(),
                ProjectId = projectId
            };

            // 3. Save to database
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();

            return newCategory;
        }

        public async Task<bool> DeleteCategoryAsync(int projectId, int categoryId, int userId)
        {
            // 1. Verify Authorization: Only space Owners can delete categories!
            var membership = await _context.ProjectMembers
                .AsNoTracking()
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);
        
            if (membership == null || membership.ProjectRole != "Owner")
            {
                return false;
            }

            // 2. Locate target category tag record
            var category = await _context.Categories
                .FirstOrDefaultAsync(cat => cat.ProjectId == projectId && cat.Id == categoryId);

            if (category == null)
            {
                return false;
            }

            // 3. Erase the record!
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}