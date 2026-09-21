namespace Backend.Services
{
    public interface IUserContextService
    {
        // Automatically extract the logged-in User ID from their token claims payload
        int GetCurrentUserId();
    }
}