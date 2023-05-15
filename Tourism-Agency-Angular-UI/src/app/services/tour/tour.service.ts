import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tour } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

    baseApiUrl: string = environment.SERVER_API_URL;

  constructor(private http: HttpClient) { }

  saveTour(tour: Tour) {
    return this.http.post<Tour>(environment.SERVER_API_URL + "/api/Tour", tour)
  }

  getAllTour() {
    return this.http.get<Tour[]>(environment.SERVER_API_URL + "/api/Tour")
  }

  deleteTour(id: string) {
    return this.http.delete<boolean>(environment.SERVER_API_URL + "/api/Tour/" + id)
  }
}
