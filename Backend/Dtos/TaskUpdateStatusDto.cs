using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class TaskUpdateStatusDto
    {
        [Required]
        [RegularExpression("^(Pending|In Progress|Completed)$", ErrorMessage ="Invalid status value.")]
        public required string Status { get; set; } = "Pending"; // Pending, In Progress
    }
}