import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    baseApiUrl: string = environment.SERVER_API_URL;

  constructor(private http: HttpClient) { }

  saveOrder(order: Order) {
    return this.http.post<Order>(this.baseApiUrl + "/api/order", order)
  }

  getOrders() {
    return this.http.get<Order[]>(this.baseApiUrl + "/api/order")
  }
}
