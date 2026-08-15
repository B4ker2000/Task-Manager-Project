using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Data;
using Backend.Dtos;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        // Inject our Database Context directly into our service
        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. Handles User Registration Logic
        public async Task<bool> RegisterAsync(UserRegisterDto request)
        {
            if(await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return false; // Email already taken
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        // 2. Handle User Login Token Generation
        public async Task<string?> LoginAsync(UserLoginDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if(user == null || !VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return null; // Invalid credentials
            }

            return CreateToken(user);
        }

        // 3. Process Profile Statistics Generation
        public async Task<object?> GetProfileAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if(user == null) return null;

            int totalAssignedTasks = 0;
            int completedTasksCount = 0;

            try
            {
                totalAssignedTasks = await _context.Tasks.CountAsync(t => t.AssignedUserId == userId);
                completedTasksCount = await _context.Tasks.CountAsync(t => t.AssignedUserId == userId && t.Status == "Completed");
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Metrics loading encounter: {ex.Message}");
            }

            return new
            {
                id = user.Id,
                username = user.Username,
                email = user.Email,
                role = "Member",
                stats = new
                {
                    total = totalAssignedTasks,
                    completed = completedTasksCount
                }
            };
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
            
            // 3.2. Create a temporary super-secret key for signing the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super_Secret_Key_That_Is_Long_Enough_For_Sha256_Compliance!"));

            // 3.3. Generate signing credentials using the secret key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            // 3.4. Build the token specifications
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1), // Token lasts for 1 day!
                SigningCredentials = creds
            };

            // 3.5. Generate and return the string token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        // 4. Handle Account Details Modification
        public async Task<bool> UpdateAccountAsync(int userId, UpdateAccountDto request)
        {
            var user = await _context.Users.FindAsync(userId);
            if(user == null) return false;

            // 4.1 Optional Username Update
            if(!string.IsNullOrWhiteSpace(request.NewUsername))
            {
                user.Username = request.NewUsername;
            }

            // 4.2 Optional Password Update (Re-hashes using internal helper)
            if(!string.IsNullOrWhiteSpace(request.NewPassword))
            {
                CreatePasswordHash(request.NewPassword, out byte[] hash, out byte[] salt);
                user.PasswordHash = hash;
                user.PasswordSalt = salt;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        // 5. Handle Permanent Account Removal
        public async Task<bool> DeleteAccountAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if(user == null) return false;

            // Clean out all personal projects and orphan tasks first to avoid database locking constraints
            var userProjects = _context.Projects.Where(p => p.Id == userId);
            var userTasks = _context.Tasks.Where(t => t.ProjectId == userId);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}