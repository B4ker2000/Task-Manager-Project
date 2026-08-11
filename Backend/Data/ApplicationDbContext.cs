using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace Backend.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; } 
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<ProjectMember> ProjectMembers { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Enforces custom User table configurations using fluent API method chains!
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users"); // Maps model explicitly to the SQL table name string
                entity.HasKey(u => u.Id); // Sets primary key indexing parameters safely

                entity.Property(u => u.Username)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(u => u.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                // Tells our database that no two accounts can share the exact same email!
                entity.HasIndex(u => u.Email)
                    .IsUnique();
            });

            modelBuilder.Entity<Project>()
                .HasOne(p => p.ProjectManager)
                .WithMany()
                .HasForeignKey(p => p.ProjectManagerId);

            // Connects Projects to Categories
            modelBuilder.Entity<Category>()
                .HasOne(c => c.Project)
                .WithMany()
                .HasForeignKey(c => c.ProjectId)
                .OnDelete(DeleteBehavior.Cascade); // If project is wiped, its categories vanish too!

            // Connects Categories to TaskItems 
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Tasks)
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.SetNull); // If category tag is deleted, keep the task but set tag to null!
        }
    }
}