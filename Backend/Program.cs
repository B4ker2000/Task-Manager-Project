using Backend.Data;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

// 2. Configure EF Core with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Register our Password/Token Helper Service
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IProjectService, ProjectService>();

// Enable HttpContext access inside independent class service layers
builder.Services.AddHttpContextAccessor();
// Register the User Identity context tracking engine
builder.Services.AddScoped<IUserContextService, UserContextService>();

// 4. Configure JWT Security Guard 
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("GreatLeaderTheEsteemedPresidentBeautifierOfLandsScriberOfMinutesAthleticsClubCaptainChiefOfSanitationHeadOfAllPrefectsMavenOfMealServicePuddingGourmetPresidentOfRedWinterScienceDepartmentAndDirectorOfCastellaProductionRenkawaCherino")),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero // Eliminates the default 5-minute token expiration delay cushion
        };
    });

// 5. CORS (Allowing the frontend/website to talk with our API. Has to be before "var app = builder.build();")
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => policy
        .WithOrigins("http://localhost:4200") // Default Angular port
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()); // Browser cookies related
});

var app = builder.Build();

app.UseCors("AllowAngular"); // Related to 5. but should be between "var app = builder.build();" and "app.UseAuthentication();"

// 6. Middleware Pipeline Routing (Order matters here!)
app.UseAuthentication(); // Checks who you are via JWT
app.UseAuthorization();  // Checks what you are allowed to do

app.MapControllers();
app.Run();