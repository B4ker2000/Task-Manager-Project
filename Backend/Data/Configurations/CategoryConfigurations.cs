using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Backend.Models;

namespace Backend.Data.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            // Explicitly set the Primary Key mapping
            builder.HasKey(c => c.Id);

            // Column Constraints
            builder.Property(c => c.Name)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(c => c.ColorHex)
                   .IsRequired()
                   .HasMaxLength(7); // Accommodates standard '#ffffff' layout perfectly
        
            // Core Relationships: Connects Projects to Categories
            builder.HasOne(c => c.Project)
                   .WithMany()
                   .HasForeignKey(c => c.ProjectId)
                   .OnDelete(DeleteBehavior.Cascade); // If project is wiped, its categories vanish too!
        }
    }
}