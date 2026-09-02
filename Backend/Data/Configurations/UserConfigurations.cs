using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Backend.Models;

namespace Backend.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.Id);

            // Column Constraints
            builder.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);

            // Security validation constraints for password hashing strings
            builder.Property(u => u.PasswordHash)
                   .IsRequired()
                   .HasMaxLength(255);

            // Database Index Layouts
            builder.HasIndex(u => u.Email)
                .IsUnique();

            // Unique constraint guard for Usernames!
            builder.HasIndex(u => u.Username)
                   .IsUnique();
        }
    }
}