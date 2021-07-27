import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from "../shopping-cart";

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  // @ts-ignore
  @Input('cart') cart: ShoppingCart = {};

}
