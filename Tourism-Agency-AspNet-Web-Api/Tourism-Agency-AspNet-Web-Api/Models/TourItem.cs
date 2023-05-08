using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class TourItem
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [ForeignKey("Tour")]
        public Guid TourId { get; set; }
        public Tour Tour { get; set; }
    }
}
