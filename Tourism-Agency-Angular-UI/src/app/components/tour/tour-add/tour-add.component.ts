import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Tour } from 'src/app/model';
import { TourService } from 'src/app/services/tour/tour.service';

@Component({
  selector: 'app-tour-add',
  templateUrl: './tour-add.component.html',
  styleUrls: ['./tour-add.component.scss'],
  providers: [MessageService]
})
export class TourAddComponent implements OnInit {

  tours: Tour[] = new Array();
  tours2: Tour[] = new Array();
  tour: Tour = new Tour();
  submitted: boolean = false;
  deleteTourDialog: boolean = false;

  deleteTour: Tour = new Tour();

  constructor(
    private messageService: MessageService,
    private tourService: TourService
  ) { }

  ngOnInit(): void {
    this.getAllTour()
  }

  saveTour() {
    this.submitted = true;
    if (this.tour.name.trim()) {
      this.submitted = false;
      if (this.tour.id == null) {
        this.tour.id = this.convertGuid();
      }
      if(this.tour.categoryTourId == null){
        this.tour.categoryTourId = "";
      }
      this.tourService.saveTour(this.tour).subscribe(res => {
        this.tour = new Tour();
        this.myMessageService('success', 'Başarılı', 'Kaydetme işlemi başarılı.');
        this.getAllTour()
      }, err => {
        if (this.tour.id == this.convertGuid()) {
          this.tour.id = null;
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
      this.tours2 = res.filter(r => r.categoryTourId == "")
    })
  }

  editTour(tour: Tour) {
    this.tour = { ...tour };
  }

  deleteTourFunction(tour: Tour) {
    this.deleteTour = { ...tour };
    this.deleteTourDialog = true;
  }

  confirmDelete() {
    this.tourService.deleteTour(this.deleteTour.id).subscribe(res => {
      this.myMessageService('success', 'Başarılı', 'Silme işlemi başarılı.');
      this.deleteTourDialog = false;
    }, err => {
      this.myMessageService('error', 'Hata', 'Tur silinirken bir hata meydana geldi.');
      this.deleteTourDialog = false;
    })
  }

  myMessageService(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
}
