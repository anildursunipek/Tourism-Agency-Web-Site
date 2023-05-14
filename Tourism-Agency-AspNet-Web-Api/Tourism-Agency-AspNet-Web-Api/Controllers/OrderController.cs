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
    public class OrderController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;
        private readonly IMapper _mapper;
        public OrderController(TourismAgencyDbContext tourismAgencyDbContext, IMapper mapper)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _tourismAgencyDbContext.Orders.ToListAsync();
            return Ok(_mapper.Map<List<OrderDto>>(orders));
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] OrderDto orderRequest)
        {
            orderRequest.Id = Guid.NewGuid();
            var userId = orderRequest.UserId;
            var tourItemId = orderRequest.TourItemId;

            if (orderRequest == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var orderMap = _mapper.Map<Order>(orderRequest);
            orderMap.User = await _tourismAgencyDbContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            orderMap.TourItem = await _tourismAgencyDbContext.TourItems.Where(t => t.Id == tourItemId).FirstOrDefaultAsync();

            if (orderMap.User == null || orderMap.TourItem == null)
            {
                return NotFound();
            }

            await _tourismAgencyDbContext.AddAsync(orderMap);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(orderMap);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteOrder([FromRoute] Guid id)
        {
            if (!await _tourismAgencyDbContext.Orders.AnyAsync(o => o.Id == id))
                return NotFound();

            var deleteOrder = await _tourismAgencyDbContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _tourismAgencyDbContext.Remove(deleteOrder);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(deleteOrder);
        }
    }
}
