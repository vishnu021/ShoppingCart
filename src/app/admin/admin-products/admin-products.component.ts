import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../product.service";
import {Subscription} from "rxjs";
import {Product} from "../../product";
import {SnapshotAction} from "@angular/fire/database";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: Product[] | undefined;
  subsription: Subscription;

  constructor(private productService: ProductService) {
    // @ts-ignore
    this.subsription = this.products = this.productService.getAll()
      .snapshotChanges()
      .subscribe(products => {
        let payload = products.map(products => {
          let obj = products.payload.val();
          // @ts-ignore
          obj['key'] = products.key;
          return obj;
        });

        // @ts-ignore
        this.filteredProducts = this.products = payload;
      });
  }


  getValue(val: SnapshotAction<unknown>, key: string): string {
    let dataSnapshot = val.payload.child(key);
    return dataSnapshot.val();
  }

  filter(query: string) {
    // @ts-ignore

    console.log("this.products : " + JSON.stringify(this.products))
    this.filteredProducts = (query) ?
      this.products.filter(p => {
        return p.title.toLowerCase().includes(query.toLowerCase());
      }) : this.products;
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
}
