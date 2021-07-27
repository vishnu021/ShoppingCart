import {Component} from '@angular/core';
import {CategoryService} from "../../category.service";
import {SnapshotAction} from "@angular/fire/database";
import {ProductService} from "../../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product: Product | undefined;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll().snapshotChanges();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.get(this.id).valueChanges().subscribe(p => {
        console.log('Product : ' + JSON.stringify(p))
        // @ts-ignore
        this.product = p;
      });
    }
  }

  save(product: any) {
    if (this.id)
      this.productService.update(this.id, product)
    else
      this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  getValue(val: SnapshotAction<unknown>): string {
    let dataSnapshot = val.payload.child('name');
    return dataSnapshot.val();
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?'))
      return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
