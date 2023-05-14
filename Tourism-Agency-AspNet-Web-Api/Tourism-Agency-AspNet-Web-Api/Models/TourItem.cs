using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class TourItem
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [JsonIgnore]
        public Tour Tour { get; set; }
        public Guid TourId { get; set; }

        public TourItemDetail TourItemDetail { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
