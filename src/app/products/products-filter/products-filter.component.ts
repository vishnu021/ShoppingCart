import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../category.service";

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent {
  @Input('category') category: any;
  categories$;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll().snapshotChanges();
  }

  getKey(val: any): string {
    return val.key;
  }

  getValue(val: any, key: string): string {
    return val.payload.child(key).val();
  }
}
