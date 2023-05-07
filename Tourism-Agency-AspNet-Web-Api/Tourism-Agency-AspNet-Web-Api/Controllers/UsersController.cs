using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Agency_AspNet_Web_Api.Data;
using Tourism_Agency_AspNet_Web_Api.Models;

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

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] User userRequest)
        {
            userRequest.Id = Guid.NewGuid();
            await _tourismAgencyDbContext.AddAsync(userRequest);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(userRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var user = await _tourismAgencyDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> editUser([FromRoute] Guid id, User updateUserRequest)
        {
            var user = await _tourismAgencyDbContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Name = updateUserRequest.Name;
            user.SurName = updateUserRequest.SurName;
            user.FullName = updateUserRequest.FullName;
            user.PhoneNumber = updateUserRequest.PhoneNumber;
            user.Email = updateUserRequest.Email;
            user.Tc = updateUserRequest.Tc;
            user.Username = updateUserRequest.Username;
            user.Password = updateUserRequest.Password;
            user.UserType = updateUserRequest.UserType;


            await _tourismAgencyDbContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteUser([FromRoute] Guid id)
        {
            var user = await _tourismAgencyDbContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            _tourismAgencyDbContext.Remove(user);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(user);
        }
    }
}
