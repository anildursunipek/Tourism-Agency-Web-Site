using System.ComponentModel.DataAnnotations;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.DTO
{
    public class TourItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public TourDto Tour { get; set; }
        public Guid TourId { get; set; }
        public TourItemDetailDto TourItemDetail { get; set; }
    }
}
