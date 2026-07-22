using System.Security.Cryptography;
using System.Text;
using System.IdentityModel;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Backend.Models;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Services
{
    public class AuthService
    {
        // 1. Turns a plain password into a secure Hash and Salt
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key; // This is the random unique key!
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)); // The scrambled result
            }
        }

        // 2. Verifies if an entered password matches what we saved (we will use this for login later)
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        // 3. JSON Web Tokens method
        public string CreateToken(User user)
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
    }
}