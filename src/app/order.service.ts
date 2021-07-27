import {ShoppingCartService} from './shopping-cart.service';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, SnapshotAction} from "@angular/fire/database";
import {Observable} from "rxjs";
import {Order} from "./order";

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) {
  }

  async placeOrder(order: any) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<any[]> {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string): Observable<any[]> {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }
}
