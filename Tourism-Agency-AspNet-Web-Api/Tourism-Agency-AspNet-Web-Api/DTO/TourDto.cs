using System.ComponentModel.DataAnnotations;

namespace Tourism_Agency_AspNet_Web_Api.DTO
{
    public class TourDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CategoryTourId { get; set; }
    }
}
