import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Tour, TourItem } from 'src/app/model';
import { TourItemService } from 'src/app/services/tour-item/tour-item.service';
import { TourService } from 'src/app/services/tour/tour.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.scss'],
  providers: [MessageService]
})
export class TourItemComponent implements OnInit {

  tours: Tour[] = new Array();
  tourItem: TourItem = new TourItem();
  tourItems: TourItem[] = new Array();
  submitted: boolean = false;
  deleteTourItemDialog: boolean = false;

  deleteTourItem: TourItem = new TourItem();

  constructor(
    private messageService: MessageService,
    private tourItemService: TourItemService,
    private tourService: TourService
  ) { }

  ngOnInit(): void {
    this.getAllTour()
  }

  changeTour() {
    this.tourItemService.findByTourId(this.tourItem.tour.id).subscribe(res => {
      this.tourItems = res;
    })
  }

  saveTourItem() {
    this.submitted = true;
    if (this.tourItem.name.trim() && this.tourItem.address.trim() && this.tourItem.price > 0 && this.tourItem.longDescription.trim() && this.tourItem.shortDescription.trim()) {
      this.submitted = false;
      this.tourItemService.saveTourItem(this.tourItem).subscribe(res => {
        this.tourItem = new TourItem();
        this.myMessageService('success', 'Başarılı', 'Kaydetme işlemi başarılı.');
        this.getAllTour()
      }, err => {
        this.myMessageService('error', 'Hata', 'Kaydedilirken bir hata meydana geldi.');
      })
    } else {
      this.myMessageService('warn', 'Uyarı', 'Gerekli alanları doldurunuz.');
    }
  }

  getAllTour() {
    // dumy veri silinecek
    for (let i = 0; i < 10; i++) {
      let tour = new Tour();
      tour.id = i.toString();
      tour.name = "tur " + i;

      if (i != 0 && i % 2 == 0) {
        tour.categoryTourId = this.tours[i % 2].id
      }

      this.tours.push(tour);
    }
    // dumy veri silinecek
    this.tourService.getAllTour().subscribe(res => {
      this.tours = res;
    })
  }

  editTour(tourItem: TourItem) {
    this.tourItem = { ...tourItem };
  }

  deleteTourItemFunction(tourItem: TourItem) {
    this.deleteTourItem = { ...tourItem };
    this.deleteTourItemDialog = true;
  }

  confirmDelete() {
    this.tourService.deleteTour(this.deleteTourItem.id).subscribe(res => {
      this.myMessageService('success', 'Başarılı', 'Silme işlemi başarılı.');
      this.deleteTourItemDialog = false;
    }, err => {
      this.myMessageService('error', 'Hata', 'Tur silinirken bir hata meydana geldi.');
      this.deleteTourItemDialog = false;
    })
  }


  myMessageService(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

}
