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
    public class TourItemDetailController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;
        private readonly IMapper _mapper;
        public TourItemDetailController(TourismAgencyDbContext tourismAgencyDbContext, IMapper mapper)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTourItemDetails()
        {
            var tourItemDetails = await _tourismAgencyDbContext.TourItemDetail.ToListAsync();
            return Ok(_mapper.Map<List<TourItemDetailDto>>(tourItemDetails));
        }

        [HttpPost]
        public async Task<IActionResult> AddTourItemDetail([FromBody] TourItemDetailDto tourItemDetailDtoRequest)
        {
            tourItemDetailDtoRequest.Id = Guid.NewGuid();
            var tourItemId = tourItemDetailDtoRequest.TourItemId;

            if (tourItemDetailDtoRequest == null)
                return BadRequest(ModelState);

            var tourItemDetail = await _tourismAgencyDbContext.TourItemDetail.Where(
                t => (t.TourItemId == tourItemDetailDtoRequest.TourItemId))
                .FirstOrDefaultAsync();

            if (tourItemDetail != null)
            {
                ModelState.AddModelError("", "Tour item already exists.");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tourItemDetailMap = _mapper.Map<TourItemDetail>(tourItemDetailDtoRequest);
            var tourItem = await _tourismAgencyDbContext.TourItems.Where(t => t.Id == tourItemId).FirstOrDefaultAsync();
            tourItemDetailMap.TourItem = tourItem;

            if (tourItemDetailMap.TourItem == null)
            {
                return NotFound();
            }

            await _tourismAgencyDbContext.AddAsync(tourItemDetailMap);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(tourItemDetailMap);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTourItemDetailById([FromRoute] Guid id)
        {
            var tourItemDetail = await _tourismAgencyDbContext.TourItemDetail.FirstOrDefaultAsync(t => t.Id == id);

            if (tourItemDetail == null)
                return NotFound();

            return base.Ok(_mapper.Map<TourDto>(tourItemDetail));
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteTourItemDetail([FromRoute] Guid id)
        {
            if (!await _tourismAgencyDbContext.TourItemDetail.AnyAsync(t => t.Id == id))
                return NotFound();

            var deleteTourItemDetail = await _tourismAgencyDbContext.TourItemDetail.FirstOrDefaultAsync(x => x.Id == id);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _tourismAgencyDbContext.Remove(deleteTourItemDetail);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(deleteTourItemDetail);
        }
    }
}
