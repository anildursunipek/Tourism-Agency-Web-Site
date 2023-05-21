using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Agency_AspNet_Web_Api.Data;
using Tourism_Agency_AspNet_Web_Api.DataStructures;
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
        [HttpGet("login/{username}/{password}")]
        public async Task<IActionResult> GetUserByUsernameAndPassowrd(string username, string password)
        {
            /*var user = await _tourismAgencyDbContext.Users.Where(u => (u.Username == username) && (u.Password == password)).FirstOrDefaultAsync();*/
            var users = await _tourismAgencyDbContext.Users.ToListAsync();
            MyHash hash = new MyHash(users.Count * 3);
            foreach (var u in users) {
                hash.Insert(u);
            }
            var user = hash.FindUser(username);
            if (user != null && user.Password == password)
            {
                return Ok(_mapper.Map<UserDto>(user));
            }
            return Ok(null);
        }

        [HttpGet]
        [Route("priority")]
        public async Task<IActionResult> GetUsersByPriority()
        {
            var users = await _tourismAgencyDbContext.Users.ToListAsync();
            var userDto = _mapper.Map<List<UserDto>>(users);
            PriorityQueue priorityQueue = new PriorityQueue();
            int priority;

            foreach(var user in userDto)
            {
                if(user.UserType == "ADMIN")
                    priority = 1;
                else if(user.UserType == "PERSONEL")
                    priority = 2;
                else if (user.UserType == "VIP")
                    priority= 3;
                else
                    priority = 4;

                priorityQueue.enqueue(priority, user);
            }

            List<UserDto> list = new List<UserDto>();
            list = priorityQueue.transferToList(list);

            return Ok(list);
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
        public async Task<IActionResult> GetUserById([FromRoute] Guid id)
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
        [Route("delete/{id:Guid}")]
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
