import { Component, OnInit } from '@angular/core';
import { Order, TourItem } from 'src/app/model';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = new Array();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // gerçek veriler geldiğinde silinecek
    let order = new Order();
    order.adult = 2
    order.child = 2
    order.fullName = "Batuhan Arslandaş"
    order.date = new Date()
    order.phoneNumber = "0 539 952 5445"
    order.tourTime = 3
    let t = new TourItem();
    t.name = "Tuı Blue Pascha Bay Hotel"
    order.tourItem = t;
    this.orders.push({ ...order });
    order.fullName = "Anıl dursun ipek"
    this.orders.push({ ...order });
    order.fullName = "Bedirhan çat"
    this.orders.push({ ...order });
    order.fullName = "Ramiz Can"
    this.orders.push({ ...order });
    // gerçek veriler geldiğinde silinecek

    // this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(res => {
      console.log(res);
      this.orders = res
    })
  }

}
