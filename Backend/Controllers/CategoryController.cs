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
    }
}