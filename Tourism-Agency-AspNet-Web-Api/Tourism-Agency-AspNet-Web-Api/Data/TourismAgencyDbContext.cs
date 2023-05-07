using Microsoft.EntityFrameworkCore;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.Data
{
    public class TourismAgencyDbContext : DbContext
    {
        public TourismAgencyDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
