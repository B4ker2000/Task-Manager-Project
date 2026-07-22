using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class TaskCreateDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Priority { get; set; } = "Medium"; // Low, Medium, High
        public DateTime? Deadline { get; set; }

        [Required]
        public int ProjectId { get; set; } // Which project does this belong to?
    }
}