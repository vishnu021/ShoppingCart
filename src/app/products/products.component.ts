import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../product";
import {map, switchMap} from 'rxjs/operators';
import {DatabaseSnapshot} from "@angular/fire/database";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {ShoppingCartService} from "../shopping-cart.service";
import {Observable, Subscription} from "rxjs";
import {ShoppingCart} from "../shopping-cart";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] | undefined = [];
  category: string | undefined;
  cart$: Observable<ShoppingCart> | undefined;

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProduct();
  }

  private populateProduct() {
    this.productService.getAll().snapshotChanges().pipe(switchMap(products => {
        // @ts-ignore
        this.filteredProducts = this.products = products.map(product => {
          let prod = product.payload.val();
          // @ts-ignore
          prod.key = product.key;
          return prod;
        });
        return this.route.queryParamMap;
      }
    )).subscribe(params => {
      // @ts-ignore
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? this.products.filter(p =>
      p.category === this.category
    ) : this.products;
  }

  getKey(val: any): string {
    return val.key;
  }

  getValue(val: any, key: string): string {
    return val.payload.child(key).val();
  }

  getVal(val: any, key: string): string {
    return val[key];
  }
}
