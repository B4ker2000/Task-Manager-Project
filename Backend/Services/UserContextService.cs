using System.Security.Claims;

namespace Backend.Services
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int? GetCurrentUserId()
        {
            // Extract the secure encrypted NameIdentifier claim out of the active HTTP web request context
            var claimValue = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (int.TryParse(claimValue, out int userId))
            {
                return userId;
            }

            return null; // Returns null if the session is expired or token structure is missing
        }
    }
}