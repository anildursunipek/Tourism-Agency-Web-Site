using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class Order
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int TourTime { get; set; }

        [Required]
        public int Adult { get; set; }

        [Required]
        public int Child { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string FullName { get; set; }

        [Required]
        [JsonIgnore]
        public User User { get; set; } // navigation property
        public Guid UserId { get; set; }

        [Required]
        [JsonIgnore]
        public TourItem TourItem { get; set; } // navigation property
        public Guid TourItemId { get; set; }
    }
}
