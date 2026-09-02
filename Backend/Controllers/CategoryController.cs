using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Backend.Dtos;
using Backend.Services;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/project/{projectId}/categories")]
    [Authorize] // Global [Authorize] rule to cover all the methods within this class!
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // Centralized Helper: Safely extracts the authenticated User ID without code duplication
        private int CurrentUserId
        {
            get
            {
                var claimValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                return int.TryParse(claimValue, out int userId) ? userId : 0;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProjectCategories(int projectId)
        {
            var categories = await _categoryService.GetCategoriesByProjectAsync(projectId);
            
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(int projectId, [FromBody] CategoryCreateDto dto)
        {
            var userId = CurrentUserId;
            if (userId == 0) return Unauthorized();

            // Call our service to handle the heavy lifting!
            var createdCategory = await _categoryService.CreateCategoryAsync(projectId, userId, dto);
            if (createdCategory == null)
            {
                return Forbid(); // The service returned null because the user isn't an Owner 
            }

            return StatusCode(201, new {
                Success = true,
                Message = "Category tag created successfully!",
                Data = createdCategory
            });
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(int projectId, int categoryId)
        {
            var userId = CurrentUserId;
            if (userId == 0) return Unauthorized();

            // Call our service to delete the category
            var success = await _categoryService.DeleteCategoryAsync(projectId, categoryId, userId);
            if (!success)
            {
                // If it fails, it means the user isn't an Owner or the Category doesn't exist
                return BadRequest(new { 
                    Success = false,
                    Message = "Category deletion failed. Verify permissions or category existence." 
                });
            }

            return Ok(new { 
                Success = true,
                Message = "Category workspace tag successfully expunged." 
            });
        }
    }
}