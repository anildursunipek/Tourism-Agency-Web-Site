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
    console.log(this.tourItem);
    if (this.tourItem.name.trim() && this.tourItem.tourItemDetail.address.trim() && this.tourItem.tourItemDetail.price > 0 && this.tourItem.tourItemDetail.longDescription.trim() && this.tourItem.tourItemDetail.shortDescription.trim()) {
      this.submitted = false;
      if (this.tourItem.id == null) {
        this.tourItem.id = this.convertGuid();
        this.tourItem.tourItemDetail.id = this.convertGuid();
      }
      this.tourItem.tourId = this.tourItem.tour.id;
      this.tourItemService.saveTourItem(this.tourItem).subscribe(res => {
        this.tourItem = new TourItem();
        this.myMessageService('success', 'Başarılı', 'Kaydetme işlemi başarılı.');
        this.getAllTour()
      }, err => {
        if (this.tourItem.id == this.convertGuid()) {
          this.tourItem.id = null;
          this.tourItem.tourItemDetail.id = null;
        }

        this.myMessageService('error', 'Hata', 'Kaydedilirken bir hata meydana geldi.');
      })
    } else {
      this.myMessageService('warn', 'Uyarı', 'Gerekli alanları doldurunuz.');
    }
  }
  convertGuid() {
    return "00000000-0000-0000-0000-000000000000";
  }

  getAllTour() {
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
