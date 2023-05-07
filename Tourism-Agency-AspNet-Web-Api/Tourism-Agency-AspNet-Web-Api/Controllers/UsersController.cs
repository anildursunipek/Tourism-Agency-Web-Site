using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Agency_AspNet_Web_Api.Data;

namespace Tourism_Agency_AspNet_Web_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;

        public UsersController(TourismAgencyDbContext tourismAgencyDbContext)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _tourismAgencyDbContext.Users.ToListAsync();
            return Ok(users);
        }
    }
}
