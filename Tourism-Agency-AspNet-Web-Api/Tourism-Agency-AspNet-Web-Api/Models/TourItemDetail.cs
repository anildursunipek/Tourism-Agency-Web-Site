using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class TourItemDetail
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public TourItem TourItem { get; set; }
        public Guid TourItemId { get; set; }
    }
}
