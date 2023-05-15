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

        [HttpGet]
        [Route("priority")]
        public async Task<IActionResult> GetAllCommentsByPriority()
        {
            var comments = await _tourismAgencyDbContext.Comments.ToListAsync();
            var commentMap = _mapper.Map<List<CommentDto>>(comments);
            PriorityQueue priorityQueue = new PriorityQueue();
            User user;
            int priority;

            foreach (var comment in commentMap)
            {
                user = await _tourismAgencyDbContext.Users.FirstOrDefaultAsync(u => u.Id == comment.UserId);
                if (user.UserType == "ADMIN")
                    priority = 1;
                else if (user.UserType == "PERSONEL")
                    priority = 2;
                else if (user.UserType == "VIP")
                    priority = 3;
                else
                    priority = 4;

                priorityQueue.enqueue(priority, comment);
            }
            List<CommentDto> list = new List<CommentDto>();
            list = priorityQueue.transferToList(list);

            return Ok(list);
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
