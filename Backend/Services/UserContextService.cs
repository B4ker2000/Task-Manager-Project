using Microsoft.AspNetCore.Http;

namespace Backend.Services
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetCurrentUserId()
        {
            if (_httpContextAccessor.HttpContext?.Items["CurrentUserId"] is int userId)
            {
                return userId;
            }

            // Fallback fail-safe mechanism
            throw new UnauthorizedAccessException("Session context missing.");
        }
    }
}