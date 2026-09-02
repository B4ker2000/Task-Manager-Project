using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class UserRegisterDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters.")]
        public required string Username { get; set; }

        [Required] 
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [StringLength(100)]
        public required string Email { get; set; }

        [Required] 
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        public required string Password { get; set; }
    }
}