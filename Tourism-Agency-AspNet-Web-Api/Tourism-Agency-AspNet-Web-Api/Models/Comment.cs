using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class Comment
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Description { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        public Guid UserId { get; set; }

        [JsonIgnore]
        public TourItem TourItem { get; set; }
        public Guid TourItemId { get; set; }
    }
}
