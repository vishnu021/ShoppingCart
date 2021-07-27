import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../order";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {ShoppingCartService} from "../shopping-cart.service";
import {OrderService} from "../order.service";
import {ShoppingCart} from "../shopping-cart";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart | undefined;
  // @ts-ignore
  shipping: {
    addressLine2: undefined,
    addressLine1: undefined,
    city: undefined,
    name: undefined
  } = {};
  userId: string = '';
  userSubscription: Subscription | undefined;


  constructor(private rouer: Router, private authService: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  async placeOrder() {
    // @ts-ignore
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.placeOrder(order);
    let result = await this.orderService.placeOrder(order);
    this.rouer.navigate(['/order-success', result.key]);
  }

}
