using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Dtos;
using Backend.Services;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/project/{projectId}/categories")]
    [Authorize] // Global [Authorize] rule to cover all the methods within this class!
    public class CategoryController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ICategoryService _categoryService;

        public CategoryController(ApplicationDbContext context, ICategoryService categoryService)
        {
            _context = context;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProjectCategories(int projectId)
        {
            var categories = await _context.Categories
                .Where(c => c.ProjectId == projectId)
                .ToListAsync();
            
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(int projectId, CategoryCreateDto dto)
        {
            // Extract current authenticated user identity details safely
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized();
            }

            // Call our service to handle the heavy lifting!
            var createdCategory = await _categoryService.CreateCategoryAsync(projectId, currentUserId, dto);

            if(createdCategory == null)
            {
                return Forbid(); // The service returned null because the user isn't an Owner 
            }

            return Ok(new { message = "Category tag created successfully!", category = createdCategory });
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(int projectId, int categoryId)
        {
            // Extract current authenticated user identity details safely
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int currentUserId))
            {
                return Unauthorized();
            }

            // Call our service to delete the category
            var success = await _categoryService.DeleteCategoryAsync(projectId, categoryId, currentUserId);

            if(!success)
            {
                // If it fails, it means the user isn't an Owner or the Category doesn't exist
                return BadRequest(new { message = "Category deletion failed. Verify permissions or category existence." });
            }

            return Ok(new { message = "Category workspace tag successfully expunged." });
        }
    }
}