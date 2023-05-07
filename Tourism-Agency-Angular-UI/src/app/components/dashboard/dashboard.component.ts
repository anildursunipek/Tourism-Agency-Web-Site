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
  name:string = "Günübirlik Turlar";
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
      if(res.length != 0){
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


    let wrapperTours: any[] = new Array();
    let toursHead: Tour[] = tours.filter(tour => tour.categoryTourId == null)

    toursHead.forEach(tourHead => {
      wrapperTours.push({ head: tourHead, children: tours.filter(tour => tour.categoryTourId == tourHead.id) })
    })
    wrapperTours.forEach(wrapperTour => {
      let childItems: any[] = new Array();
      wrapperTour.children.forEach(child => {
        childItems.push({ label: child.name, routerLink: '/dashboard/'+ child.id })
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

  asd(event) {
    console.log(event);

  }
}