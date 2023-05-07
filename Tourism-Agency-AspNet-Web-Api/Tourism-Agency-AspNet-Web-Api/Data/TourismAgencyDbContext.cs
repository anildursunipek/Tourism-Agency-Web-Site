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
        public DbSet<Tour> Tours { get; set; }
        public DbSet<TourItem> TourItems { get; set; }
        public DbSet<Order> Orders { get; set; }

    }
}
