using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class Comment
    {
        [Required]
        public Guid id { get; set; }

        [Required]
        public string comment { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public User User { get; set; }

        [Required]
        [ForeignKey("TourItemId")]
        public Guid TourItemId { get; set; }
        public TourItem TourItem { get; set; }
    }
}
