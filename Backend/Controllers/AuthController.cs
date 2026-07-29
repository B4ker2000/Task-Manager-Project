using Backend.Data;
using Backend.Dtos;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // This makes the URL look like: api/auth
    [Authorize]
    public class AuthController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthService _authService;

        // We inject our database and our auth service here
        public AuthController(ApplicationDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")] // This makes the URL: api/auth/register
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserRegisterDto request)
        {
            // 1. Check if the email is already taken
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest("A user with this email already exists!");
            }

            // 2. Hash and Salt the password using our helper service
            _authService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            // 3. Create the new User object
            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            // 4. Save the user into the SQLite database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User successfully registered!");
        }
        [HttpPost("login")] // This makes the URL: api/auth/Login
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto request)
        {
            // 1. Check if the user exists by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if(user == null)
            {
                return BadRequest("Invalid email or password!");
            }

            // 2. Check if the password is correct
            if(!_authService.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Invalid email or password!");
            }

            // 3. Generate the token for user
            string token = _authService.CreateToken(user);

            // 4. Return the token to the frontend
            return Ok(new { token = token });
        }

        [HttpGet("profile")] // GET: api/auth/profile
        public async Task<IActionResult> GetUserProfile()
        {
            // Extract the unique User ID embedded inside the secure token claims payload!
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // the "?" here is basically a mini "if()" where if "ClaimTypes.NameIdentifier" deosn't exists it return "null"!
            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId)) 
            {
                return Unauthorized(new { message = "Session expired or invalid token structure!"});
            }

            // Look up the user record in your SQLite context file
            var user = await _context.Users.FindAsync(userId);
            if(user == null)
            {
                return NotFound(new { message = "User account no longer exists!" });
            }

            // Initial statistical values
            int totalAssignedTasks = 0;
            int completedTasksCount = 0;

            try
            {
                totalAssignedTasks = await _context.Tasks
                    .CountAsync(t => t.AssignedUserId == userId);

                completedTasksCount = await _context.Tasks
                    .CountAsync(t => t.AssignedUserId == userId && t.Status == "Completed");
            }
            catch(Exception ex)
            {
                // Log the exception details to the backend terminal if a query hiccups
                Console.WriteLine($"Metrics loading encounter: {ex.Message}");
            }

            // Safely pack user fields out to the frontend (omits password hash and salt records!)
            return Ok(new
            {
                id = user.Id,
                username = user.Username,
                email = user.Email,
                role = "Member", // hardcoded default placeholder until we run DB migrations for Admin features later so also temp!
                stats = new
                {
                    total = totalAssignedTasks,
                    completed = completedTasksCount
                }
            });
        }

        [HttpPut("update-account")]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateAccountDto request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

            var user = await _context.Users.FindAsync(userId);
            if(user == null) return NotFound(new { message = "User not found." });

            // 1. Optional Username Update
            if(!string.IsNullOrWhiteSpace(request.NewUsername))
            {
                user.Username = request.NewUsername;
            }

            // 2. Optional Password Update (Re-hashes using your AuthService tool)
            if(!string.IsNullOrWhiteSpace(request.NewPassword))
            {
                _authService.CreatePasswordHash(request.NewPassword, out byte[] hash, out byte[] salt);
                user.PasswordHash = hash;
                user.PasswordSalt = salt;
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Account details successfully updated!" });
        }

        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

            var user = await _context.Users.FindAsync(userId);
            if(user == null) return NotFound(new { message = "User not found." });

            // Clean out all personal projects and orphan tasks first to avoid database locking constraints
            var userProjects = _context.Projects.Where(p => p.Id == userId); // Adjust logic later for project owners
            var userTasks = _context.Tasks.Where(t => t.ProjectId == userId); // Temporary cascade safeguard

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Your account has been permanently removed." });
        }
    }
}