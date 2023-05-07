import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourItem } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourItemService {

  constructor(private http:HttpClient) { }

  saveTourItem(tourItem: TourItem) {
    return this.http.post<TourItem>(environment.SERVER_API_URL + "/tour/item/save", tourItem)
  }

  findByTourId(id:string) {
    return this.http.get<TourItem[]>(environment.SERVER_API_URL + "/tour/item/find/by/tour/id/"+id)
  }

  deleteTourItem(id: string) {
    return this.http.get<boolean>(environment.SERVER_API_URL + "/tour/item/delete/" + id)
  }
}
