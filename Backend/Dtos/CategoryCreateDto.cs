using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class CategoryCreateDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(7)]
        public string ColorHex { get; set; }
    }
}