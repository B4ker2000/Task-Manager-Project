using Backend.Data;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

// Configure EF Core with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Register our Password/Token Helper Service
builder.Services.AddScoped<AuthService>();

// 4. Configure JWT Security Guard 
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super_Secret_Key_That_Is_Long_Enough_For_Sha256_Compliance!")),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// 5. CORS (Allowing the frontend/website to talk with our API. Has to be before "var app = builder.build();")
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => policy
        .WithOrigins("http://localhost:4200") // Default Angular port
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowAngular"); // Related to 5. but should be between "var app = builder.build();" and "app.UseAuthentication();"

// 5. Middleware Pipeline Routing (Order matters here!)
app.UseAuthentication(); // Checks who you are via JWT
app.UseAuthorization();  // Checks what you are allowed to do

app.MapControllers();
app.Run();
