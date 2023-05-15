namespace Tourism_Agency_AspNet_Web_Api.DataStructures
{
    public class Graph
    {
        int[,] kenar;
        int boyut;
        public Graph(int boyut)
        {
            int i, j;
            this.boyut = boyut;
            kenar = new int[boyut, boyut];
            for (i = 0; i < boyut; i++)
            {
                for (j = 0; j < boyut; j++)
                {
                    kenar[i, j] = 0;
                }
            }
        }
        public void kenarekle(int baslangic, int bitis, int agirlik)
        {
            kenar[baslangic, bitis] = agirlik;
        }
        public void yaz()
        {

            string[] sehirler = { "izmir", "bursa", "mus", "istanbul", "antalya", "ordu" };

            int i = 0;
            for (int j = 1; j < 7; j++)
            {
                Console.WriteLine(sehirler[j - 1] + " " + kenar[i, j] + " km");
            }

        }
        public void kucukBul()
        {
            int min = kenar[0, 1];

            string[] sehirler = { "izmir", "bursa", "mus", "istanbul", "antalya", "ordu" };
            string minsehir = "";

            for (int j = 1; j < 6; j++)
            {
                if (min > kenar[0, j + 1])
                {
                    min = kenar[0, j + 1];
                    minsehir = sehirler[j];
                }

            }
            Console.WriteLine(minsehir + " " + min + " km");
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            Graph Graf = new Graph(7);
            Graf.kenarekle(0, 0, 0);//ankara
            Graf.kenarekle(0, 1, 589);//izmir
            Graf.kenarekle(0, 2, 380);//bursa
            Graf.kenarekle(0, 3, 1027);//mus
            Graf.kenarekle(0, 4, 444);//istanbul
            Graf.kenarekle(0, 5, 476);//antalya
            Graf.kenarekle(0, 6, 560);//ordu

            Graf.yaz();

            Graf.kucukBul();

            Console.ReadKey();
        }
    }
}
