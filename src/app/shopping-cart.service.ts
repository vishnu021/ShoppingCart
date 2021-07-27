import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/database";
import {Product} from "./product";
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ShoppingCart} from "./shopping-cart";
import {ShoppingCartItem} from "./shopping-cart-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  CART_LINK: string = '/shopping-cart';


  constructor(private db: AngularFireDatabase) {
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async getCartFromDB(): Promise<AngularFireObject<unknown>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this.CART_LINK + "/" + cartId);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cart = await this.getCartFromDB();
    return cart.snapshotChanges().pipe(map(x => {
      // @ts-ignore
      return new ShoppingCart(x.payload.val()?.items);
    }));
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object(this.CART_LINK + "/" + cartId + "/items"  ).remove();
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId)
      return cartId

    let result = await this.create();
    // @ts-ignore
    localStorage.setItem('cartId', result.key);
    // @ts-ignore
    return result.key;
  }

  private create() {
    return this.db.list(this.CART_LINK).push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: any, productId: string): AngularFireObject<ShoppingCartItem> {
    return this.db.object(this.CART_LINK + '/' + cartId + '/items/' + productId);
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();

    // @ts-ignore
    let key = product.key ? product.key : product.$key;
    let item$ = this.getItem(cartId, key);

    item$.snapshotChanges().pipe(take(1)).subscribe(raw => {
      // @ts-ignore
      let item: ShoppingCartItem = raw.payload.val();
      let quantity = (item?.quantity || 0) + change;
      if (quantity == 0) {
        item$.remove();
      } else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    });
  }
}
