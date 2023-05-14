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
        public Tour Tour { get; set; }

        public TourItemDetail TourItemDetail { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
