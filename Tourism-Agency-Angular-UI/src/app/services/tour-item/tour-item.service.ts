import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourItem } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourItemService {
    baseApiUrl: string = environment.SERVER_API_URL;

  constructor(private http:HttpClient) { }

  saveTourItem(tourItem: TourItem) {
    return this.http.post<TourItem>(environment.SERVER_API_URL + "/api/TourItem/", tourItem)
  }

  findByTourId(id:string) {
    return this.http.get<TourItem[]>(environment.SERVER_API_URL + "/api/TourItem/"+id)
  }

  getAll() {
    return this.http.get<TourItem[]>(environment.SERVER_API_URL + "/api/TourItem")
  }

  deleteTourItem(id: string) {
    return this.http.delete<boolean>(environment.SERVER_API_URL + "/api/TourItem/" + id)
  }

  getMaximum(){
    return this.http.get<TourItem>(environment.SERVER_API_URL + "/api/TourItem/maximum")
  }
  getMinimum(){
    return this.http.get<TourItem>(environment.SERVER_API_URL + "/api/TourItem/minimum")
  }
  getInorder(){
    return this.http.get<TourItem[]>(environment.SERVER_API_URL + "/api/TourItem/inorder")
  }
  getPrice(value:number){
    return this.http.get<TourItem>(environment.SERVER_API_URL + "/api/TourItem/" + value)
  }
}
