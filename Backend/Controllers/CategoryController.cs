using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Backend.Dtos;
using Backend.Services;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/project/{projectId}/categories")]
    [Authorize] // Global [Authorize] rule to cover all the methods within this class!
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IUserContextService _userContext;

        public CategoryController(ICategoryService categoryService, IUserContextService userContextService)
        {
            _categoryService = categoryService;
            _userContext = userContextService;
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
            var CurrentUserId = _userContext.GetCurrentUserId();

            // Call our service to handle the heavy lifting!
            var createdCategory = await _categoryService.CreateCategoryAsync(projectId, CurrentUserId, dto);
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
            var CurrentUserId = _userContext.GetCurrentUserId();

            // Call our service to delete the category
            var success = await _categoryService.DeleteCategoryAsync(projectId, categoryId, CurrentUserId);
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