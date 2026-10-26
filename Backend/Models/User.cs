using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string PreferredLanguage { get; set; } = "en-us";
        public string PreferredTheme { get; set; } = "light";
        public string PreferredFont { get; set; } = string.Empty;
        public string PreferredColorblind { get; set; } = string.Empty;
        public List<int> OrderedProjectIds { get; set; } = new List<int>();
        
        [MaxLength(2048)]
        public string? AvatarUrl { get; set; }
    }
}