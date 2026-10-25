namespace Backend.Dtos
{
    public class UserPreferencesDto
    {
        public string Language { get; set; } = "en-us";
        public string Theme { get; set; } = "light";
        public string Font { get; set; } = string.Empty;
        public string Colorblind { get; set; } = string.Empty;
    }
}