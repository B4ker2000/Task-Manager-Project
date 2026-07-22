using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class TaskUpdateStatusDto
    {
        [Required]
        public string Status { get; set; } = "Pending"; // Pending, In Progress
    }
}