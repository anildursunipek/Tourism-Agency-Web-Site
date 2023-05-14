using System.ComponentModel.DataAnnotations;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.DTO
{
    public class TourItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Tour Tour { get; set; }
        public TourItemDetail TourItemDetail { get; set; }
    }
}
