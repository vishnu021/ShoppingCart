import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../product";
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCart} from "../shopping-cart";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product | undefined;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart | undefined;

  constructor(private cartService: ShoppingCartService) {

  }
  addToCart() {
    // @ts-ignore
    this.cartService.addToCart(this.product);
  }
}
