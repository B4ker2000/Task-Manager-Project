using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class ProjectCreateDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Project name must be between 2 and 100 characters.")]
        public required string Name { get; set; }

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string Description { get; set; } = string.Empty; // Do NOT add "= string.Empty;" when using a "[Required]" decorator as it defuses it!!!
    }
}