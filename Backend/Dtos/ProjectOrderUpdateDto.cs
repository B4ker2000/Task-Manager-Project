namespace Backend.Dtos
{
    public class ProjectOrderUpdateDto
    {
        public List<int> OrderedProjectIds { get; set; } = new List<int>();
    }
}