using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Agency_AspNet_Web_Api.Data;
using Tourism_Agency_AspNet_Web_Api.DTO;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;
        private readonly IMapper _mapper;
        public UsersController(TourismAgencyDbContext tourismAgencyDbContext, IMapper mapper)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _tourismAgencyDbContext.Users.ToListAsync();
            return Ok(_mapper.Map<List<UserDto>>(users));
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] UserDto userRequest)
        {
            userRequest.Id = Guid.NewGuid();
            if (userRequest == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userMap = _mapper.Map<User>(userRequest);
            await _tourismAgencyDbContext.AddAsync(userMap);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(userMap);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var user = await _tourismAgencyDbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound();

            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> updateUser([FromRoute] Guid id, [FromBody] UserDto updateUserDtoRequest)
        {
            if (updateUserDtoRequest == null)
                return BadRequest(ModelState);

            if (id != updateUserDtoRequest.Id)
                return BadRequest(ModelState);

            if (!await _tourismAgencyDbContext.Users.AnyAsync(u => u.Id == id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var user = _mapper.Map<User>(updateUserDtoRequest);
            _tourismAgencyDbContext.Update(user);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(user);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteUser([FromRoute] Guid id)
        {
            if (!await _tourismAgencyDbContext.Users.AnyAsync(u => u.Id == id))
                return NotFound();

            var deleteUser = await _tourismAgencyDbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _tourismAgencyDbContext.Remove(deleteUser);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(deleteUser);
        }
    }
}
