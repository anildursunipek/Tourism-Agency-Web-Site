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
            var commentsMap = _mapper.Map<List<CommentDto>>(comments);
            foreach (var comment in commentsMap)
            {
                comment.User = _mapper.Map<UserDto>(await _tourismAgencyDbContext.Users.FirstOrDefaultAsync(t => t.Id == comment.UserId));
                comment.TourItem = _mapper.Map<TourItemDto>(await _tourismAgencyDbContext.TourItems.FirstOrDefaultAsync(t => t.Id == comment.TourItemId));
                comment.TourItem.TourItemDetail = _mapper.Map<TourItemDetailDto>(await _tourismAgencyDbContext.TourItemDetail.FirstOrDefaultAsync(t => t.TourItemId == comment.TourItem.Id));
                comment.TourItem.Tour = _mapper.Map<TourDto>(await _tourismAgencyDbContext.Tours.FirstOrDefaultAsync(t => t.Id == comment.TourItem.TourId));
            }
            return Ok(commentsMap);
        }

        [HttpGet]
        [Route("priority")]
        public async Task<IActionResult> GetAllCommentsByPriority()
        {
            var comments = await _tourismAgencyDbContext.Comments.ToListAsync();
            var commentsMap = _mapper.Map<List<CommentDto>>(comments);
            foreach (var comment in commentsMap)
            {
                comment.User = _mapper.Map<UserDto>(await _tourismAgencyDbContext.Users.FirstOrDefaultAsync(t => t.Id == comment.UserId));
                comment.TourItem = _mapper.Map<TourItemDto>(await _tourismAgencyDbContext.TourItems.FirstOrDefaultAsync(t => t.Id == comment.TourItemId));
                comment.TourItem.TourItemDetail = _mapper.Map<TourItemDetailDto>(await _tourismAgencyDbContext.TourItemDetail.FirstOrDefaultAsync(t => t.TourItemId == comment.TourItem.Id));
                comment.TourItem.Tour = _mapper.Map<TourDto>(await _tourismAgencyDbContext.Tours.FirstOrDefaultAsync(t => t.Id == comment.TourItem.TourId));
            }
            PriorityQueue priorityQueue = new PriorityQueue();
            int priority;

            foreach (var comment in commentsMap)
            {
                if (comment.User.UserType == "ADMIN")
                    priority = 1;
                else if (comment.User.UserType == "PERSONEL")
                    priority = 2;
                else if (comment.User.UserType == "VIP")
                    priority = 3;
                else
                    priority = 4;

                priorityQueue.enqueue(priority, comment);
            }
            List<CommentDto> list = new List<CommentDto>();
            list = priorityQueue.transferToList(list);

            return Ok(list);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetAllCommentsByPriority([FromRoute] Guid id)
        {
            var comments = await _tourismAgencyDbContext.Comments.Where(c => c.TourItemId == id).ToListAsync();
            var commentsMap = _mapper.Map<List<CommentDto>>(comments);
            foreach (var comment in commentsMap)
            {
                comment.User = _mapper.Map<UserDto>(await _tourismAgencyDbContext.Users.FirstOrDefaultAsync(t => t.Id == comment.UserId));
                comment.TourItem = _mapper.Map<TourItemDto>(await _tourismAgencyDbContext.TourItems.FirstOrDefaultAsync(t => t.Id == comment.TourItemId));
                comment.TourItem.TourItemDetail = _mapper.Map<TourItemDetailDto>(await _tourismAgencyDbContext.TourItemDetail.FirstOrDefaultAsync(t => t.TourItemId == comment.TourItem.Id));
                comment.TourItem.Tour = _mapper.Map<TourDto>(await _tourismAgencyDbContext.Tours.FirstOrDefaultAsync(t => t.Id == comment.TourItem.TourId));
            }
            PriorityQueue priorityQueue = new PriorityQueue();
            int priority;

            foreach (var comment in commentsMap)
            {
                if (comment.User.UserType == "ADMIN")
                    priority = 1;
                else if (comment.User.UserType == "PERSONEL")
                    priority = 2;
                else if (comment.User.UserType == "VIP")
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
