using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ProjectMember
    {
        [Key]
        public int Id { get; set; }

        // Link to the Project Table
        [Required]
        public int ProjectId { get; set; }

        [ForeignKey("ProjectId")]
        public Project? Project { get; set; }

        // Link to the Users Table
        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        // Project-Specific Account Tier (Admin/Creator-Member)
        [Required]
        public string ProjectRole { get; set; } = "Member";
    }
}