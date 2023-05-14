using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class Tour
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string CategoryTourId { get; set; }
        public List<TourItem> TourItems { get; set; }
    }
}
