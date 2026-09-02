using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Backend.Models;

namespace Backend.Data.Configurations
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            // Explicitly set the Primary Key mapping
            builder.HasKey(p => p.Id);

            // Database Column Constraints
            builder.Property(p => p.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.Description)
                   .HasMaxLength(500);

            // Set up relationship mapping with Restrict behavior to prevent accidental cascading delete loops
            builder.HasOne(p => p.ProjectManager)
                   .WithMany()
                   .HasForeignKey(p => p.ProjectManagerId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}