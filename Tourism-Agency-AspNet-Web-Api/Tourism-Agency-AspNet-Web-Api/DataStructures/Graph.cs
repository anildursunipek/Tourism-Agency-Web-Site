namespace Tourism_Agency_AspNet_Web_Api.DataStructures
{
    public class CityDto
    {
        public double Latitute { get; set; }
        public double Longitude { get; set; }
        public string name { get; set; }
        public int dist { get; set; }
    }
    public class City
    {
        public double Latitude, Longitude;
        public string name;
        public int dist;
        public City(double lat, double lng, string name, int dist)
        {
            this.Latitude = lat;
            this.Longitude = lng;
            this.name = name;
            this.dist = dist;
        }
        public City() { }
    }

    public class Graph
    {

        int[,] edge;
        int dim;
        public Graph(int dim)
        {
            int i, j;
            this.dim = dim;
            edge = new int[dim, dim];
            for (i = 0; i < dim; i++)
            {
                for (j = 0; j < dim; j++)
                {
                    edge[i, j] = 0;
                }
            }
        }
        public void AddEdge(int start, int end, int weight)
        {
            edge[start, end] = weight;

        }
        public City FindMin()
        {
            int min = edge[0, 1];
            City city = new City();

            City[] cities = { new City(38.42, 27.14, "İzmir", 589), new City(40.19, 29.05, "Bursa", 380), new City(38.74, 41.05, "Muş", 1027), new City(41.00, 28.97, "İstanbul", 444), new City(36.89, 30.71, "Antalya", 476), new City(40.79, 37.38, "Ordu", 560) };

            for (int j = 1; j < 6; j++)
            {
                if (min > edge[0, j + 1])
                {
                    min = edge[0, j + 1];
                    city = cities[j];
                }
            }

            return city;
        }
    }
}
