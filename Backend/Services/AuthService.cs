using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Data;
using Backend.Dtos;
using Backend.Exceptions;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        // Inject our Database Context directly into our service
        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // 1. Handles User Registration Logic
        public async Task RegisterAsync(UserRegisterDto request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                throw new BadRequestException("A user with this email already exists!");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Username = request.Username.Trim(),
                Email = request.Email.Trim().ToLower(), // Standardize casing for query matches
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        // 2. Handle User Login Token Generation
        public async Task<string> LoginAsync(UserLoginDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                throw new BadRequestException("Email and Password are required fields.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email.Trim().ToLower());
            if (user == null || !VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                // Invalid credentials
                throw new BadRequestException("Invalid email or password!");
            }

            return CreateToken(user);
        }

        // 3. Process Profile Statistics Generation
        public async Task<object> GetProfileAsync(int userId)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId) 
                ?? throw new NotFoundException("User account no longer exists!");

            int totalAssignedTasks = 0;     // Initial-
            int completedTasksCount = 0;    // -values.

            try
            {
                totalAssignedTasks = await _context.Tasks.AsNoTracking().CountAsync(t => t.AssignedUserId == userId);
                completedTasksCount = await _context.Tasks.AsNoTracking().CountAsync(t => t.AssignedUserId == userId && t.Status == "Completed");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Metrics loading encounter: {ex.Message}");
            }

            return new
            {
                id = user.Id,
                username = user.Username,
                email = user.Email,
                role = "Member",
                stats = new {
                    total = totalAssignedTasks,
                    completed = completedTasksCount
                }
            };
        }

        // 4. Handle Account Details Modification
        public async Task UpdateAccountAsync(int userId, UpdateAccountDto request)
        {
            var user = await _context.Users.FindAsync(userId)
                ?? throw new NotFoundException("User not found");

            // 4.1 Optional Username Update
            if (!string.IsNullOrWhiteSpace(request.NewUsername))
            {
                user.Username = request.NewUsername.Trim();
            }

            // 4.2 Optional Password Update (Re-hashes using internal helper)
            if (!string.IsNullOrWhiteSpace(request.NewPassword))
            {
                CreatePasswordHash(request.NewPassword, out byte[] hash, out byte[] salt);
                user.PasswordHash = hash;
                user.PasswordSalt = salt;
            }

            await _context.SaveChangesAsync();
        }

        // 5. Handle Permanent Account Removal
        public async Task DeleteAccountAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId)
                ?? throw new NotFoundException("User not found");

            // Purge target entity assignments and records explicitly before user removal
            var memberships = await _context.ProjectMembers.Where(pm => pm.UserId == userId).ToListAsync();
            if (memberships.Any()) _context.ProjectMembers.RemoveRange(memberships);

            // Reassign or unassign tasks instead of leaving them orphaned
            var assignedTasks = await _context.Tasks.Where(t => t.AssignedUserId == userId).ToListAsync();
            foreach (var task in assignedTasks)
            {
                task.AssignedUserId = null; // Mark task as unassigned cleanly
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        // --- Core Internal Crypto Helper Utilities ---
        // 1. Turns a plain password into a secure Hash and Salt
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key; // This is the random unique key!
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); // The scrambled result
            }
        }

        // 2. Verifies if an entered password matches what we saved (we will use this for login later)
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        // 3. JSON Web Tokens method
        private string CreateToken(User user)
        {
            // 3.1. Create the claims (the information stored inside the token about the user)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            };
            
            // 3.2. Dynamic Pull: Read key securely from appsettings.json!
            var secretKey = _configuration["JwtSettings:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("JWT Secret Key is missing from configuration settings.");
            } 

            // 3.3. Generate signing credentials using the secret key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            // 3.4. Dynamic Pull: Read expiration duration dynamically too!
            var expiryDays = double.TryParse(_configuration["JwtSettings:ExpiryDays"], out var days) ? days : 1;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(expiryDays), // Token lasts for 1 day!
                SigningCredentials = creds
            };

            // 3.5. Generate and return the string token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}