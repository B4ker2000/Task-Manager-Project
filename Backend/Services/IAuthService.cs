using Backend.Dtos;

namespace Backend.Services
{
    public interface IAuthService
    {
        // Returns true if registered successfully, false if email is already taken
        Task RegisterAsync(UserRegisterDto request);

        // Returns the JWT token string if successful, null if login fails
        Task<string> LoginAsync(UserLoginDto request);

        // Custom object matching the frontend profile metadata structure
        Task<object> GetProfileAsync(int userId);

        // Update User Account Information
        Task UpdateAccountAsync(int userId, UpdateAccountDto request);

        // Delete User Account
        Task DeleteAccountAsync(int userId);
    }
}