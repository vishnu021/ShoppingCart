import {ShoppingCartItem} from "./shopping-cart-item";
import {Product} from "./product";

export class ShoppingCart {
  public items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({...item, $key: productId}));
    }
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) { // @ts-ignore
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }

  getQuantity(product: Product): number {
    let items = this.itemsMap;
    let item = items[product.key];
    // @ts-ignore
    return (item) ? item.quantity : 0;
  }
}
