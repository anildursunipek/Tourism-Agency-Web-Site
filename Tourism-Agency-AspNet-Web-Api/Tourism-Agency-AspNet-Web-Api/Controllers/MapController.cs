using Microsoft.AspNetCore.Mvc;
using Tourism_Agency_AspNet_Web_Api.Data;
using Tourism_Agency_AspNet_Web_Api.DataStructures;


namespace Tourism_Agency_AspNet_Web_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MapController : Controller
    {
        private readonly TourismAgencyDbContext _tourismAgencyDbContext;
        public MapController(TourismAgencyDbContext tourismAgencyDbContext)
        {
            _tourismAgencyDbContext = tourismAgencyDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetMinRoute()
        {
            Graph graph = new Graph(7);
            graph.AddEdge(0, 0, 0);//ankara
            graph.AddEdge(0, 1, 589);//izmir
            graph.AddEdge(0, 2, 380);//bursa
            graph.AddEdge(0, 3, 1027);//mus
            graph.AddEdge(0, 4, 444);//istanbul
            graph.AddEdge(0, 5, 476);//antalya
            graph.AddEdge(0, 6, 560);//ordu

            City city = graph.FindMin();

            CityDto cityDto = new CityDto();
            cityDto.name = city.name;
            cityDto.Longitude = city.Longitude;
            cityDto.Latitute = city.Latitude;
            cityDto.dist = city.dist;

            List<CityDto> list = new List<CityDto>();
            list.Add(cityDto);

            return Ok(list);
        }
    }
}
