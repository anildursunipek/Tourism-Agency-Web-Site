using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.DTO
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public UserDto User { get; set; }
        public Guid UserId { get; set; }
        public TourItemDto TourItem { get; set; }
        public Guid TourItemId { get; set; }
    }
}
