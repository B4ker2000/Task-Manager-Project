namespace Backend.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Priority { get; set; } = "Medium"; // Low, Medium, High
        public string Status { get; set; } = "Pending"; // Pending, In Progress
        public DateTime? Deadline { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign Key link to the Project it belongs to
        public int ProjectId { get; set; }
        public Project? Project { get; set; }

        // Foregn Key link to the User assigned to this task
        public int? AssignedUserId { get; set; }
        public User? AssigendUser { get; set; }

        // Optional foreign key relation column (nullable because tasks can start without a category tag!)
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}