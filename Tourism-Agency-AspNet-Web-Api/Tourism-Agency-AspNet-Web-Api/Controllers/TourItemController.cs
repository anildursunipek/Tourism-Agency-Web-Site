using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Agency_AspNet_Web_Api.Data;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TourItemController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;

        public TourItemController(TourismAgencyDbContext tourismAgencyDbContext)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTourItem()
        {
            var tourItem = await _tourismAgencyDbContext.TourItems.ToListAsync();
            return Ok(tourItem);
        }

        [HttpPost]
        public async Task<IActionResult> AddTourItem([FromBody] TourItem tourItemRequest)
        {
            tourItemRequest.Id = Guid.NewGuid();
            await _tourismAgencyDbContext.AddAsync(tourItemRequest);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(tourItemRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTourItem([FromRoute] Guid id)
        {
            var tourItem = await _tourismAgencyDbContext.TourItems.FirstOrDefaultAsync(x => x.Id == id);

            if (tourItem == null)
            {
                return NotFound();
            }
            return Ok(tourItem);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> editTourItem([FromRoute] Guid id, TourItem updateTourItemRequest)
        {
            var tourItem = await _tourismAgencyDbContext.TourItems.FindAsync(id);

            if (tourItem == null)
            {
                return NotFound();
            }

            updateTourItemRequest.Id = updateTourItemRequest.Id;
            updateTourItemRequest.Name = updateTourItemRequest.Name;
            updateTourItemRequest.TourId = updateTourItemRequest.TourId;
            updateTourItemRequest.Tour = updateTourItemRequest.Tour;



            await _tourismAgencyDbContext.SaveChangesAsync();

            return Ok(tourItem);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteTourItem([FromRoute] Guid id)
        {
            var tourItem = await _tourismAgencyDbContext.TourItems.FindAsync(id);

            if (tourItem == null)
            {
                return NotFound();
            }
            _tourismAgencyDbContext.Remove(tourItem);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(tourItem);
        }
    }
}
