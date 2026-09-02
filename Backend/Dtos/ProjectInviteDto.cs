using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class ProjectInviteDto
    {
        [Required]
        [EmailAddress]
        public required string InvitedEmail { get; set; }

        [Required]
        [RegularExpression("^(Owner|Member|Viewer)$", ErrorMessage = "Role must be Owner, Member, or Viewer")]
        public string ProjectRole { get; set; } = "Member"; // By default user roles will be set to "Member"
    }
}