import {Product} from "./product";

export class ShoppingCartItem {
  $key: string | undefined;
  title: string | undefined;
  imageUrl:string | undefined;
  price: number | undefined;
  quantity: number | undefined;

  constructor(init?: Partial<ShoppingCartItem> ) {
  Object.assign(this, init);
  }

  get totalPrice() {
    // @ts-ignore
    return this.price * this.quantity;
  }

}
