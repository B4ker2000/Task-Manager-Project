using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class ProjectCreateDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
    }
}
