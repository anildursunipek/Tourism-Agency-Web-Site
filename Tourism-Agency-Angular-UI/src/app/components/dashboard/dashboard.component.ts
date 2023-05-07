import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Tour, TourItem } from 'src/app/model';
import { TourItemService } from 'src/app/services/tour-item/tour-item.service';
import { TourService } from 'src/app/services/tour/tour.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  items: MenuItem[] = new Array();
  tourItems: TourItem[] = new Array();
  images: string[] = new Array();
  name: string = "Günübirlik Turlar";
  isDetail: boolean = true;
  selectedTourItem: TourItem = new TourItem();
  tours: Tour[] = new Array();
  tourItemImages: any[] =
    [
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/nov.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr10678637157356579141847-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr10678637157357896729323-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr10678637157357944706177-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr10678637157358124260946-1024x683.jpg" }
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869029620634.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869045376662.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869033364641.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869041320655.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869058792685.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869070804706.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869037264647.jpg" }
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320277-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320280-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320279-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320276-1024x682.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320278-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-315001-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-315020-1024x683.jpg" }
      ]

    ]

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
    private tourService: TourService,
    private tourItemService: TourItemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.images.push("https://eksenturizm.com.tr/wp-content/uploads/2021/12/banner-e1640158060407.jpg");
    this.images.push("https://eksenturizm.com.tr/wp-content/uploads/2021/12/banner-e1640158060407.jpg");
    this.images.push("https://eksenturizm.com.tr/wp-content/uploads/2021/12/banner-e1640158060407.jpg");
    this.getAllTour()

    let id = this.route.snapshot.params['id']
    console.log(id);

    id != undefined ? this.findByTourId(id) : false;

  }

  findByTourId(id: string) {
    this.tourItemService.findByTourId(id).subscribe(res => {
      this.tourItems = res;
      if (res.length != 0) {
        this.name = res[0].tour.name
      }
    })
  }

  getAllTour() {

    let tours: Tour[] = new Array();
    for (let i = 0; i < 10; i++) {
      let tour = new Tour();
      tour.id = i.toString();
      tour.name = "tur " + i;

      if (i != 0 && i % 2 == 0) {
        tour.categoryTourId = tours[i % 2].id
      }

      tours.push(tour);
    }
    this.tours = tours;


    let wrapperTours: any[] = new Array();
    let toursHead: Tour[] = tours.filter(tour => tour.categoryTourId == null)

    toursHead.forEach(tourHead => {
      wrapperTours.push({ head: tourHead, children: tours.filter(tour => tour.categoryTourId == tourHead.id) })
    })
    wrapperTours.forEach(wrapperTour => {
      let childItems: any[] = new Array();
      wrapperTour.children.forEach(child => {
        childItems.push({ label: child.name, routerLink: '/dashboard/' + child.id })
      })
      this.items.push(
        {
          label: wrapperTour.head.name,
          items: childItems
        })

    })


    // this.tourService.getAllTour().subscribe(res => {
    //   let wrapperTours: any[] = new Array();
    //   let toursHead: Tour[] = res.filter(tour => tour.categoryTourId == null)

    //   toursHead.forEach(tourHead => {
    //     wrapperTours.push({ head: tourHead, children: res.filter(tour => tour.categoryTourId == tourHead.id) })
    //   })
    //   wrapperTours.forEach(wrapperTour => {
    //     let childItems: any[] = new Array();
    //     wrapperTour.children.forEach(child => {
    //       childItems.push({ label: child.name, routerLink: 'dashboard/' + child.id })
    //     })
    //     this.items.push(
    //       {
    //         label: wrapperTour.head.name,
    //         items: childItems
    //       })

    //   })
    // })
  }

  tourItemDetail(tourItem: TourItem) {
    console.log(tourItem);

    // this.selectedTourItem = {...tourItem}

    let dumyTourItem: TourItem = new TourItem();
    dumyTourItem.address = "Konaklı- Alanya Konaklı- Alanya";
    dumyTourItem.name = "Noxinn Club Hotel";
    dumyTourItem.price = 985.48456;
    dumyTourItem.tour = this.tours[0];
    dumyTourItem.imageUrls = this.tourItemImages[Math.floor(Math.random() * 3)]
    dumyTourItem.shortDescription = "<p>Tesis Mağusa şehir merkezine 15 km ve Ercan Havalimanı’na 45 km mesafede konumlanıyor. Deniz sıfır olarak konumlanan tesisin 1 km uzunluğunda özel kumsal plajı bulunuyor. Tesise ait bir adet iskele bulunuyor.</p>"
    dumyTourItem.longDescription = "<p>Kahvaltı (07:30 ile 10:00 saatleri arasında)<br>Geç Kahvaltı (10:00 ile 10:30 saatleri arasında)(Mini Büfe)<br>Öğle Yemeği (12:30 ile 14:00 saatleri arasında)<br>Garden Snack Restaurant (11:30 ile 16:30 saatleri arasında) (Bahçe Snack Restoran)<br>Sahil Snack Restaurant (11:00 ile 16:30 saatleri arasında)<br>Dondurma (11:00 ile 15:00 saatleri arasında) (Bahçe Snack Restoran)<br>Gözleme (10:30 ile 16:30 saatleri arasında) (Bahçe Snack Restoran)<br>Pastane (11:00 ile 17:00 saatleri arasında)(Mini Büfe) (Lobby Bar)<br>Akşam Yemeği (19:00 ile 21:00 saatleri arasında)<br>İtalyan Ala Carte Restoran (19:00 ile 21:00 saatleri arasında)(6 gece ve üzeri konaklamalarda bir kereliğine ücretsiz)(Ön Rezervasyonlu)(Bir gün öncesinde rezervasyon yapılmalı)<br>Gece Yemeği (23:30 ile 01:00 saatleri arasında) (Ana Restoran) (çorba, mini büfe, meyve ve tatlı)<br>Lobby (Turkuaz) Bar (10:00 ile 18:00 saatleri arasında)<br>Havuz Bar (10:00 ile 00:00 saatleri arasında)<br>Sahil Bar (10:00 ile 18:00 saatleri arasında)<br>Bahçe Bar (11:00 ile 00:00 saatleri arasında)</p><p>Sabah kahvaltısı, öğle ve akşam yemekleri açık büfe olup tesisin belirlediği markalar dahilinde yerli alkollü ve alkolsüz içecekler 10:00 ile 00:00 saatleri arasında ücretsizdir. Taze sıkılmış portakal suyu, premium içecekler, ithal içecekler, şampanyalar, özel şaraplar, özel kokteyller, özel konyaklar ücretlidir. Türk kahvesi ücretsizdir. Konsept dahilindeki tüm içecekler bardakta servis edilir, şişe ile servis edilmemektedir.</p>";
    this.selectedTourItem = { ...dumyTourItem }
    this.isDetail = false;

  }
}