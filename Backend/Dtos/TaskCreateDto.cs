using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class TaskCreateDto
    {
        [Required]
        [StringLength(100)]
        public required string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [RegularExpression("^(Low|Medium|High)$", ErrorMessage = "Priority must be Low, Medium, or High.")]
        public string Priority { get; set; } = "Medium"; // Low, Medium, High
        
        public DateTime? Deadline { get; set; }

        [Required]
        public required int ProjectId { get; set; } // Which project does this belong to?
    }
}