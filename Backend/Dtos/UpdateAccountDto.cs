using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public class UpdateAccountDto
    {
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters.")]
        public string? NewUsername { get; set; }
        
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string? NewPassword { get; set; }
    }
}