using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class Comment
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Description { get; set; }
        public User User { get; set; }
        public TourItem TourItem { get; set; }
    }
}
