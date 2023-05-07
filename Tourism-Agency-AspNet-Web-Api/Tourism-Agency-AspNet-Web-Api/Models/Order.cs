using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class Order
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey("TourItem")]
        public Guid TourItemId { get; set; }
        public TourItem TourItem { get; set; }

        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int PersonCount { get; set; }
        [Required]
        public int TourTime { get; set; }
        [Required]
        public int Adult { get; set; }
        [Required]
        public int Child { get; set; }
        [Required]
        public int TotalPerson { get; set; }
    }
}
