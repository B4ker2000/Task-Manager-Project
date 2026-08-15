using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class CategoryCreateDto
    {
        [Required]
        [StringLength(50)]
        public required string Name { get; set; }

        [Required]
        [StringLength(7)]
        public required string ColorHex { get; set; }
    }
}