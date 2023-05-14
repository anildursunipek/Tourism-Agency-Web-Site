using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tourism_Agency_AspNet_Web_Api.Data;
using Tourism_Agency_AspNet_Web_Api.DTO;
using Tourism_Agency_AspNet_Web_Api.Models;

namespace Tourism_Agency_AspNet_Web_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TourController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;
        private readonly IMapper _mapper;

        public TourController(TourismAgencyDbContext tourismAgencyDbContext, IMapper mapper)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTours()
        {
            var tours = await _tourismAgencyDbContext.Tours.ToListAsync();
            return base.Ok(_mapper.Map<List<TourDto>>(tours));
        }

        [HttpPost]
        public async Task<IActionResult> AddTour([FromBody] TourDto tourDtoRequest)
        {
            if(tourDtoRequest == null)
            {
                return BadRequest(ModelState);
            }
            var tour = await _tourismAgencyDbContext.Tours
                .Where(t => t.Name.Trim().ToLower() == tourDtoRequest.Name.Trim().ToLower())
                .FirstOrDefaultAsync();
            if(tour != null)
            {
                ModelState.AddModelError("", "Category already exists.");
                return StatusCode(422, ModelState);
            }

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tourMap = _mapper.Map<Tour>(tourDtoRequest);
            await _tourismAgencyDbContext.AddAsync(tourMap);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(tourMap);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTourById([FromRoute] Guid id)
        {
            var tour = await _tourismAgencyDbContext.Tours.FirstOrDefaultAsync(x => x.Id == id);

            if (tour == null)
            {
                return NotFound();
            }
            return base.Ok(_mapper.Map<TourDto>(tour));
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> updateTour([FromRoute] Guid id, [FromBody]TourDto updateTourRequest)
        {
            if(updateTourRequest == null)
                return BadRequest(ModelState);
            if(id != updateTourRequest.Id)
                return BadRequest(ModelState);
            if (!await _tourismAgencyDbContext.Tours.AnyAsync(t => t.Id == id))
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var tour = _mapper.Map<Tour>(updateTourRequest);
            _tourismAgencyDbContext.Update(tour);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(tour);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteTour([FromRoute] Guid id)
        {
            if (! await _tourismAgencyDbContext.Tours.AnyAsync(t => t.Id == id))
                return NotFound();

            var deleteTour = await _tourismAgencyDbContext.Tours.FirstOrDefaultAsync(x => x.Id == id);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _tourismAgencyDbContext.Remove(deleteTour);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(deleteTour);
        }
    }
}
