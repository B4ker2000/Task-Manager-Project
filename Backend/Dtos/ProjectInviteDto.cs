namespace Backend.Dtos
{
    public class ProjectInviteDto
    {
        public string InvitedEmail { get; set; } = string.Empty;
        public string ProjectRole { get; set; } = "Member"; // By default user roles will be set to "Member"
    }
}