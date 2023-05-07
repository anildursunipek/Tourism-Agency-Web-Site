using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Tourism_Agency_AspNet_Web_Api.Models
{
    public class Tour
    {
        [Required]
        public Guid id { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public string categoryId { get; set; }
    }
}
