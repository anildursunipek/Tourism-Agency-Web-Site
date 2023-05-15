using System.ComponentModel.DataAnnotations;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.DTO
{
    public class TourItemDetailDto
    {
        public Guid Id { get; set; }
        public string Address { get; set; }
        public string LongDescription { get; set; }
        public string ShortDescription { get; set; }
        public decimal Price { get; set; }
        public Guid TourItemId { get; set; }
    }
}
