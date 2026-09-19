using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Backend.Models;

namespace Backend.Data.Configurations
{
    public class TaskItemConfiguration : IEntityTypeConfiguration<TaskItem>
    {
        public void Configure(EntityTypeBuilder<TaskItem> builder)
        {
            builder.HasKey(t => t.Id);

            // Column Constraints
            builder.Property(t => t.Title)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(t => t.Description)
                   .HasMaxLength(1000); // Plenty of space for detailed project notes
            
            builder.Property(t => t.Status)
                   .IsRequired()
                   .HasMaxLength(30); // For: "Pending", "In Progress", "Review Required" & "Completed

            builder.Property(t => t.Priority)
                   .IsRequired()
                   .HasMaxLength(15); // For: "Low", "Medium", "High"

            builder.Property(t => t.SortOrder)
                   .IsRequired();
                               
            // Core Relationships: Connects Categories to TaskItems 
            builder.HasOne(t => t.Category)
                   .WithMany(c => c.Tasks)
                   .HasForeignKey(t => t.CategoryId)
                   .OnDelete(DeleteBehavior.SetNull); // If category tag is deleted, keep the task but set tag to null!

            // Project Parent link with Cascade Delete: If a Project is wiped, all its tasks go with it!
            builder.HasOne(t => t.Project)
                   .WithMany()
                   .HasForeignKey(t => t.ProjectId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Assigned User link: If a team member leaves the company/app, keep the task active
            builder.HasOne(t => t.AssignedUser)
                   .WithMany()
                   .HasForeignKey(t => t.AssignedUserId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}