using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Dtos;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/project/{projectId}/categories")]
    [Authorize]
    public class CategoryController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetProjectCategories(int projectId)
        {
            var categories = await _context.Categories
                .Where(c => c.ProjectId == projectId)
                .ToListAsync();
            
            return Ok(categories);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCategory(int projectId, CategoryCreateDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized();
            }

            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);

            if(membership == null || membership.ProjectRole != "Owner")
            {
                return Forbid();
            }

            var newCategory = new Category
            {
                Name = dto.Name.Trim(),
                ColorHex = dto.ColorHex.Trim(),
                ProjectId = projectId
            };

            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Category tag created successfully!", category = newCategory });
        }

        [HttpDelete("{categoryId}")]
        [Authorize]
        public async Task<IActionResult> DeleteCategory(int projectId, int categoryId)
        {
            // Extract current authenticated user identity details safely
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized();
            }

            // Verify Authorization: Only space Owners/Project Managers can delete categories!
            var membership = await _context.ProjectMembers
                .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == currentUserId);
            
            if(membership == null || membership.ProjectRole != "Owner")
            {
                return Forbid(); // Turn away unauthorized regular space members!
            }

            // Locate target category tag row record
            var category = await _context.Categories
                .FirstOrDefaultAsync(cat => cat.ProjectId == projectId && cat.Id == categoryId);

            if(category == null)
            {
                return NotFound(new { message = "Category tag record not found inside this workspace." });
            }

            // Erase the record! Any task cards carrying this tag will safely drop it without getting deleted!
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Category workspace tag successfully expunged." });
        }
    }
}