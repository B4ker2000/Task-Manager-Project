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
            await _authService.RegisterAsync(request);

            return StatusCode(201, new {
                Success = true,
                Message = "User successfully registered!"
            });
        }
        
        [HttpPost("login")] // This makes the URL: api/auth/login
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginDto request)
        {
            var token = await _authService.LoginAsync(request);

            return Ok(new { 
                Success = true,
                Token = token 
            });
        }

        [HttpGet("profile")] // GET: api/auth/profile
        public async Task<IActionResult> GetUserProfile()
        {
            // Extract the unique User ID embedded inside the secure token claims payload!
            var currentUserId = _userContext.GetCurrentUserId();

            // Look up the user record in our SQLite context file
            var profileData = await _authService.GetProfileAsync(currentUserId);

            return Ok(profileData);
        }

        [HttpPut("update-account")]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateAccountDto request)
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _authService.UpdateAccountAsync(currentUserId, request);

            return Ok(new { 
                Success = true, 
                Message = "Account details successfully updated!" 
            });
        }

        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount()
        {
            var currentUserId = _userContext.GetCurrentUserId();

            await _authService.DeleteAccountAsync(currentUserId);
            
            return Ok(new { 
                Success = true, 
                Message = "Your account has been permanently removed." 
            });
        }
    }
}