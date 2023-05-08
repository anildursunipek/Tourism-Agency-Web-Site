using Microsoft.AspNetCore.Mvc;

namespace Tourism_Agency_AspNet_Web_Api.Controllers
{
    public class TourController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
