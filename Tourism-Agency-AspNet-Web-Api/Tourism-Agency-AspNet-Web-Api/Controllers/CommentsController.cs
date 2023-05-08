using Microsoft.AspNetCore.Mvc;

namespace Tourism_Agency_AspNet_Web_Api.Controllers
{
    public class CommentsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
