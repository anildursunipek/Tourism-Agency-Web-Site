using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.DTO
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public int TourTime { get; set; }
        public int Adult { get; set; }
        public int Child { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        public UserDto User { get; set; }
        public Guid UserId { get; set; }
        public TourItemDto TourItem { get; set; }
        public Guid TourItemId { get; set; }
    }
}
