import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {Product} from "../product";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: any;
  @Input('shopping-cart') shoppingCart:any;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    // @ts-ignore
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    // @ts-ignore
    this.cartService.removeFromCart(this.product);
  }

  getVal(val: any, key: string): string {
    return val[key];
  }
}
