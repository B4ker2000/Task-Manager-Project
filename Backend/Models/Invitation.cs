using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Invitation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [ForeignKey("ProjectId")]
        public Project? Project { get; set; }

        [Required]
        public string InvitedEmail { get; set; } = string.Empty;

        public int? InvitedUserId { get; set; }

        [ForeignKey("InvitedUserId")]
        public User? InvitedUser { get; set; }

        [Required]
        public int InvitedByUserId { get; set; }

        [ForeignKey("InvitedByUserId")]
        public User? InvitedByUser { get; set; }

        [Required]
        public string Status { get; set; } = "Pending";

        [Required]
        public string ProjectRole { get; set; } = "Member";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ExpiresAt { get; set; }
        
        public DateTime? RespondedAt { get; set; }
    }
}