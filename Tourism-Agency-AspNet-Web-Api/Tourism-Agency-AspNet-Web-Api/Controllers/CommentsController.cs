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
    public class CommentsController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;
        private readonly IMapper _mapper;
        public CommentsController(TourismAgencyDbContext tourismAgencyDbContext, IMapper mapper)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComments()
        {
            var comments = await _tourismAgencyDbContext.Comments.ToListAsync();
            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> AddCommit([FromBody] CommentDto CommentDtoRequest)
        {
            CommentDtoRequest.Id = Guid.NewGuid();
            var tourItemId = CommentDtoRequest.TourItemId;
            var userId = CommentDtoRequest.UserId;

            if (CommentDtoRequest == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentMap = _mapper.Map<Comment>(CommentDtoRequest);
            var tour = await _tourismAgencyDbContext.TourItems.Where(t => t.Id == tourItemId).FirstOrDefaultAsync();
            var user = await _tourismAgencyDbContext.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            commentMap.TourItem = tour;
            commentMap.User = user;

            if (commentMap.User == null && commentMap.TourItem == null)
            {
                return NotFound();
            }

            await _tourismAgencyDbContext.AddAsync(commentMap);
            await _tourismAgencyDbContext.SaveChangesAsync();
            return Ok(commentMap);
        }
    }
}
