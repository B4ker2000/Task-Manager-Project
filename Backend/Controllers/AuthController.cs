using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserContextService _userContext;

        public AuthController(IAuthService authService, IUserContextService userContext)
        {
            _authService = authService;
            _userContext = userContext;
        }
        
        [HttpPost("register")] // This makes the URL: api/auth/register
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto request)
        {
            var registered = await _authService.RegisterAsync(request);
            // 1. Check if the email is already taken
            if (!registered)
            {
                return BadRequest(new { 
                    Success = false,
                    Message = "A user with this email already exists!"
                });
            }

            return StatusCode(201, new {
                Success = true,
                Message = "User successfully registered!"
            });
        }
        
        [HttpPost("login")] // This makes the URL: api/auth/Login
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginDto request)
        {
            var token = await _authService.LoginAsync(request);
            if (token == null)
            {
                return BadRequest(new {
                    Success = false,
                    Message = "Invalid email or password!"
                });
            }

            return Ok(new { 
                Success = true,
                Token = token 
            });
        }

        [HttpGet("profile")] // GET: api/auth/profile
        public async Task<IActionResult> GetUserProfile()
        {
            // Extract the unique User ID embedded inside the secure token claims payload!
            var CurrentUserId = _userContext.GetCurrentUserId();
            if (CurrentUserId == null) 
            {
                return Unauthorized(new { 
                    Success = false,
                    Message = "Session expired or invalid token structure!"
                });
            }

            // Look up the user record in our SQLite context file
            var profileData = await _authService.GetProfileAsync(CurrentUserId.Value);
            if (profileData == null)
            {
                return NotFound(new { 
                    Success = false, 
                    Message = "User account no longer exists!" 
                });
            }

            return Ok(profileData);
        }

        [HttpPut("update-account")]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateAccountDto request)
        {
            var CurrentUserId = _userContext.GetCurrentUserId();
            if (CurrentUserId == null) return Unauthorized();

            var success = await _authService.UpdateAccountAsync(CurrentUserId.Value, request);
            if (!success) 
            {
                return NotFound(new { 
                    Success = false, 
                    Message = "User not found." 
                });
            }

            return Ok(new { 
                Success = true, 
                Message = "Account details successfully updated!" 
            });
        }

        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount()
        {
            var CurrentUserId = _userContext.GetCurrentUserId();
            if (CurrentUserId == null) return Unauthorized();

            var success = await _authService.DeleteAccountAsync(CurrentUserId.Value);
            if (!success) 
            {
                return NotFound(new { 
                    Success = false, 
                    Message = "User not found." 
                });
            }

            return Ok(new { 
                Success = true, 
                Message = "Your account has been permanently removed." 
            });
        }
    }
}