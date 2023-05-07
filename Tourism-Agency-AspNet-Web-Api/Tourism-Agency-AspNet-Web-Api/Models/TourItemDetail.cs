using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class TourItemDetail
    {
        [Required]
        public Guid id { get; set; }

        [Required]
        public string address { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public decimal price { get; set; }

        [Required]
        [ForeignKey("TourItem")]
        public Guid TourItemId { get; set; }
        public TourItem TourItem { get; set; }
    }
}
