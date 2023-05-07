import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tour } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  saveTour(tour: Tour) {
    return this.http.post<Tour>(environment.SERVER_API_URL + "/tour/save", tour)
  }

  getAllTour() {
    return this.http.get<Tour[]>(environment.SERVER_API_URL + "/tour/get/all")
  }

  deleteTour(id: string) {
    return this.http.get<boolean>(environment.SERVER_API_URL + "/tour/delete/" + id)
  }
}
