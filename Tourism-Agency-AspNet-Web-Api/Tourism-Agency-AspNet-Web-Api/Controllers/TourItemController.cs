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
    public class TourItemController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;
        private readonly IMapper _mapper;
        public TourItemController(TourismAgencyDbContext tourismAgencyDbContext, IMapper mapper)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTourItems()
        {
            var tourItems = await _tourismAgencyDbContext.TourItems.ToListAsync();
            return Ok(_mapper.Map<List<TourItemDto>>(tourItems));
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTourItemById([FromRoute] Guid id)
        {
            var tourItem = await _tourismAgencyDbContext.TourItems.FirstOrDefaultAsync(t => t.Id == id);
            if (tourItem == null)
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(tourItem);
        }

        [HttpPost]
        public async Task<IActionResult> AddTourItem([FromBody] TourItemDto tourItemDtoRequest)
        {
            tourItemDtoRequest.Id = Guid.NewGuid();
            var tourId = tourItemDtoRequest.TourId;

            if (tourItemDtoRequest == null)
                return BadRequest(ModelState);

            var tourItem = await _tourismAgencyDbContext.TourItems.Where(
                t => (t.Name.Trim().ToLower() == tourItemDtoRequest.Name.Trim().ToLower()) &&
                (t.TourId == tourItemDtoRequest.TourId)
                )
                .FirstOrDefaultAsync();

            if (tourItem != null)
            {
                ModelState.AddModelError("", "Tour item already exists.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tourItemMap = _mapper.Map<TourItem>(tourItemDtoRequest);
            var tour = await _tourismAgencyDbContext.Tours.Where(t => t.Id == tourId).FirstOrDefaultAsync();
            tourItemMap.Tour = tour;

            if (tourItemMap.Tour == null)
            {
                return NotFound();
            }

            await _tourismAgencyDbContext.AddAsync(tourItemMap);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(tourItemMap);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteTourItem([FromRoute] Guid id)
        {
            if (!await _tourismAgencyDbContext.TourItems.AnyAsync(t => t.Id == id))
                return NotFound();

            var deleteTourItem = await _tourismAgencyDbContext.TourItems.FirstOrDefaultAsync(x => x.Id == id);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _tourismAgencyDbContext.Remove(deleteTourItem);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(deleteTourItem);
        }
    }
}
