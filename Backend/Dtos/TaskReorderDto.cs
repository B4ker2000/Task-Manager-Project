using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class TaskReorderDto
    {
        [Required]
        public required string Status { get; set; }

        [Required]
        public required List<int> TaskIds { get; set; }
    }
}