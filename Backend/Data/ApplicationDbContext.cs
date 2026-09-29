using Microsoft.EntityFrameworkCore;
using Backend.Models;
using System.Reflection;
using System.Text.Json;
using Backend.Data.Configurations;

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
        public DbSet<Invitation> Invitations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Global reflection discovery (Scans and includes every configuration it finds)
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            // More or lese the as above but we have more control over what gets included and what doesn't this way!
            // modelBuilder.ApplyConfiguration(new UserConfiguration());
            // modelBuilder.ApplyConfiguration(new ProjectConfiguration());
            // modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            // modelBuilder.ApplyConfiguration(new TaskItemConfiguration());


            // Global property configuration loop
            foreach(var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // Find all string properties on the current entity table model
                var stringProperties = entityType.GetProperties()
                    .Where(p => p.ClrType == typeof(string));

                foreach(var property in stringProperties)
                {
                    if(property.GetMaxLength() == null)
                    {
                        property.SetMaxLength(255);
                    }
                }
            }

            // Configure SQLite to map our integer list as a JSON text column string! (SQLite doesn't suppor arrays natively!)
            modelBuilder.Entity<User>()
                .Property(u => u.OrderedProjectIds)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null!),
                    v => JsonSerializer.Deserialize<List<int>>(v, (JsonSerializerOptions)null!) ?? new List<int>(),
                    new Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer<List<int>>(
                        (c1, c2) => c1!.SequenceEqual(c2!),
                        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v)),
                        c => c.ToList()
                    )
            );
        }
    }
}