namespace Backend.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relationship: Every project must have a manager (User)
        public int ProjectManagerId { get; set; }
        public User? ProjectManager { get; set; }
    }
}