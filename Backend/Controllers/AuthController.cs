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
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")] // This makes the URL: api/auth/register
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserRegisterDto request)
        {
            var registered = await _authService.RegisterAsync(request);
            // 1. Check if the email is already taken
            if (!registered)
            {
                return BadRequest("A user with this email already exists!");
            }

            return Ok("User successfully registered!");
        }
        [HttpPost("login")] // This makes the URL: api/auth/Login
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto request)
        {
            var token = await _authService.LoginAsync(request);
            if(token == null)
            {
                return BadRequest("Invalid email or password!");
            }

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

            // Look up the user record in our SQLite context file
            var profileData = await _authService.GetProfileAsync(userId);
            if(profileData == null)
            {
                return NotFound(new { message = "User account no longer exists!" });
            }

            return Ok(profileData);
        }

        [HttpPut("update-account")]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateAccountDto request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

            var success = await _authService.UpdateAccountAsync(userId, request);
            if(!success) return NotFound(new { message = "User not found." });

            return Ok(new { message = "Account details successfully updated!" });
        }

        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(!int.TryParse(userIdClaim, out int userId)) return Unauthorized();

            var success = await _authService.DeleteAccountAsync(userId);
            if(!success) return NotFound(new { message = "User not found." });

            return Ok(new { message = "Your account has been permanently removed." });
        }
    }
}