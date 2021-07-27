import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component } from '@angular/core';
import { switchMap } from "rxjs/operators";
import {Observable} from "rxjs";
import {Order} from "../order";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<any[]>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
  }
}
