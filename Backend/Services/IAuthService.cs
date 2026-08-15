using Backend.Dtos;
using Backend.Models;

namespace Backend.Services
{
    public interface IAuthService
    {
        // Returns true if registered successfully, false if email is already taken
        Task<bool> RegisterAsync(UserRegisterDto request);

        // Returns the JWT token string if successful, null if login fails
        Task<string?> LoginAsync(UserLoginDto request);

        // Custom object matching the frontend profile metadata structure
        Task<object?> GetProfileAsync(int userId);

        // Update User Account Information
        Task<bool> UpdateAccountAsync(int userId, UpdateAccountDto request);

        // Delete User Account
        Task<bool> DeleteAccountAsync(int userId);
    }
}