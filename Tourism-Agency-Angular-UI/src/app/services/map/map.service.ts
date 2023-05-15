import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
    baseApiUrl: string = environment.SERVER_API_URL;

    constructor(private http: HttpClient) { }

    getOverlays() {
      return this.http.get<any>(this.baseApiUrl + "/api/Map")
    }

}
