using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(7)]
        public string ColorHex { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}