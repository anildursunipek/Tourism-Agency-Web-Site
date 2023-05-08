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
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr10678637157356579141847.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr10678637157357896729323.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr10678637157357944706177.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr10678637157358124260946.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869045376662.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869033364641.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869058792685.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869037264647.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/02/tsr06248635965869131332813.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320277.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320276.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320276.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-320278.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/12/Miarosa-Konakli-Garden-Genel-315020.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/tsr05941637511632455658248.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/tsr05941637511632797261212.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/tsr05941637511631853999007.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/tsr05941637511632840824303.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/tsr05941637511633169298701-1024x683.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/03/tsr01585637429569133202014.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/03/tsr01585637429567903123324.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/03/tsr01585637429568310698803-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/03/tsr01585637429566599014207.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/03/tsr01585637429568583938750.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/04/5302020125544-.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/04/02072020115316-.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/04/5302020125543-.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/04/02072020115333-.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/04/05302020125517-.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/sapanca-4.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/Sapanca-golu.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/1_Ormanya.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/sapanca-3.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/sapanca-1.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/2406_b.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/2404_b.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/2403_b.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/2405_b-1.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/2494_b.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/08/02272021051800.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/08/02272021051720.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/08/02272021051742.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/08/02272021051752.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/08/02272021051834.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/09/yedigoller-1.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/09/yedigoller-4.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/09/yedigoller-3.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/09/yedigoller-2.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/The-Arkin-Iskele-Genel-348326.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/The-Arkin-Iskele-Genel-348324.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/The-Arkin-Iskele-Genel-346820.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/The-Arkin-Iskele-Genel-348321.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/The-Arkin-Iskele-Yeme-Icme-348873.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/Concorde-Tower-Casino-Convention-Spa-Genel-323941-1024x616.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/Concorde-Tower-Casino-Convention-Spa-Yeme-Icme-323980.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/Concorde-Tower-Casino-Convention-Spa-Yeme-Icme-323957.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/Concorde-Tower-Casino-Convention-Spa-Yeme-Icme-323981.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/Concorde-Tower-Casino-Convention-Spa-Oda-324021.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr00223636960347612242891-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr00223636960347582223096.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr00223636960347580660025.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr00223636960347596841643.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr00223636960347584736587.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/lords-palace-hotel-spa-casino_292467.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/lords-palace-hotel-spa-casino_292472.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/lords-palace-hotel-spa-casino_292483.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/lords-palace-hotel-spa-casino_292502.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/02/lords-palace-hotel-spa-casino_437947.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/cratos-premium-hotel_242817.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/cratos-premium-hotel_242867.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/cratos-premium-hotel_242809.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/cratos-premium-hotel_242878.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/cratos-premium-hotel_242821.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/richmond-nua-wellness-spa-sapanca_297594.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/richmond-nua-wellness-spa-sapanca_205479.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/richmond-nua-wellness-spa-sapanca_205501.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/richmond-nua-wellness-spa-sapanca_205489.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/richmond-nua-wellness-spa-sapanca_205494.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/midas-hotel-haymana-termal-spa_155048.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/midas-hotel-haymana-termal-spa_155043.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/midas-hotel-haymana-termal-spa_155044.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/midas-hotel-haymana-termal-spa_296689.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/10/midas-hotel-haymana-termal-spa_155047.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/gazelle-resort-spa_313085.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/gazelle-resort-spa_313097.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/gazelle-resort-spa_330419.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/gazelle-resort-spa_313100.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/gazelle-resort-spa_313103.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/13b88ac74c46528f8016445ca442a11c.png" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/m486mbsxlatmffiakjx9.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/lvevxmwhgcyjga27ueoj.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/a93d956464a20362da3efd6dc426d2d0.png" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/q3fwho58pjjtzvqfqsgk.jpg" },
      ],
      [
        { thumbnailImageSrAc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/GS-Genel-1024x638.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/NG-Sapanca-Wellness-Convention-Aktivite-104787.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/farina-restoran.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/NG-Sapanca-Wellness-Convention-Genel-120742.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/NG-Sapanca-Oda-319474.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr23789638041043827574677.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr23789638041043823355790.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr23789638041043831196760.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr23789638041043829932768.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr23789638041043822418484-1.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr26178638070444764940815.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr26178638070444787281415.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr26178638070444770017896.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr26178638070444774461654.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/03/tsr26178638070444771180038.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/ohrid-5-16.09.2019105403-3-b0-1.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/bitola-manastir-2-16.09.2019110649-49-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/elbasan-4-3.10.2019143326-26-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/struga-4-3.10.2019142631-31-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/uskup-9-14.09.2019112952-52-b0.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/belgrad-1-13.09.2019110735-35-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/belgrad-4-13.09.2019110737-37-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/budva-3-14.09.2019113509-9-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/mostar-8-14.09.2019112828-28-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2023/01/novi-sad-2-18.09.2019171235-35-b0.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/06/bastan-sona-balkanlar-turu-12692-20-08.11.2018172815-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/06/bastan-sona-balkanlar-turu-12692-18-08.11.2018172804-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/06/bastan-sona-balkanlar-turu-12692-14-08.11.2018172744-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/06/bastan-sona-balkanlar-turu-12692-12-08.11.2018172731-b0.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/06/bastan-sona-balkanlar-turu-12692-6-08.11.2018172701-b0-1024x770.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/317730.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/317731.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/317715.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/317718.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/317729.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/314002.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/313991.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/314026.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/313996.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2021/12/313997.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/09/tsr14776637776705827191272-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/09/tsr14776637776705831254814-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/09/tsr14776637776705837580764-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/09/tsr14776637776705829222534-1024x683.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/09/tsr14776637776705832660795-1024x683.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/11/6384_b.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/11/6381_b.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/11/6397_b.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/11/6402_b.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/11/6408_b.jpg" },
      ],
      [
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/04/titan-select-hotel.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/04/rio.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/04/amelia-beach.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/01/orange-county-resort-alanya_3060.jpg" },
        { thumbnailImageSrc: "https://eksenturizm.com.tr/wp-content/uploads/2022/04/transatlantik.jpg" },
      ],

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
    console.log(this.tourItemImages[0][0]);
    console.log(this.tourItemImages[0]);
    console.log(this.tourItemImages);
    
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
    dumyTourItem.imageUrls = this.tourItemImages[Math.floor(Math.random() * 10)]
    dumyTourItem.shortDescription = "<p>Tesis Mağusa şehir merkezine 15 km ve Ercan Havalimanı’na 45 km mesafede konumlanıyor. Deniz sıfır olarak konumlanan tesisin 1 km uzunluğunda özel kumsal plajı bulunuyor. Tesise ait bir adet iskele bulunuyor.</p>"
    dumyTourItem.longDescription = "<p>Kahvaltı (07:30 ile 10:00 saatleri arasında)<br>Geç Kahvaltı (10:00 ile 10:30 saatleri arasında)(Mini Büfe)<br>Öğle Yemeği (12:30 ile 14:00 saatleri arasında)<br>Garden Snack Restaurant (11:30 ile 16:30 saatleri arasında) (Bahçe Snack Restoran)<br>Sahil Snack Restaurant (11:00 ile 16:30 saatleri arasında)<br>Dondurma (11:00 ile 15:00 saatleri arasında) (Bahçe Snack Restoran)<br>Gözleme (10:30 ile 16:30 saatleri arasında) (Bahçe Snack Restoran)<br>Pastane (11:00 ile 17:00 saatleri arasında)(Mini Büfe) (Lobby Bar)<br>Akşam Yemeği (19:00 ile 21:00 saatleri arasında)<br>İtalyan Ala Carte Restoran (19:00 ile 21:00 saatleri arasında)(6 gece ve üzeri konaklamalarda bir kereliğine ücretsiz)(Ön Rezervasyonlu)(Bir gün öncesinde rezervasyon yapılmalı)<br>Gece Yemeği (23:30 ile 01:00 saatleri arasında) (Ana Restoran) (çorba, mini büfe, meyve ve tatlı)<br>Lobby (Turkuaz) Bar (10:00 ile 18:00 saatleri arasında)<br>Havuz Bar (10:00 ile 00:00 saatleri arasında)<br>Sahil Bar (10:00 ile 18:00 saatleri arasında)<br>Bahçe Bar (11:00 ile 00:00 saatleri arasında)</p><p>Sabah kahvaltısı, öğle ve akşam yemekleri açık büfe olup tesisin belirlediği markalar dahilinde yerli alkollü ve alkolsüz içecekler 10:00 ile 00:00 saatleri arasında ücretsizdir. Taze sıkılmış portakal suyu, premium içecekler, ithal içecekler, şampanyalar, özel şaraplar, özel kokteyller, özel konyaklar ücretlidir. Türk kahvesi ücretsizdir. Konsept dahilindeki tüm içecekler bardakta servis edilir, şişe ile servis edilmemektedir.</p>";
    this.selectedTourItem = { ...dumyTourItem }
    this.isDetail = false;

  }
}