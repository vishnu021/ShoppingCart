import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {AppUser} from "../models/app-user";
import {ShoppingCartService} from "../shopping-cart.service";
import {ShoppingCart} from "../shopping-cart";
import {Observable} from "rxjs";
import {AngularFireObject} from "@angular/fire/database";
import {take} from "rxjs/operators";

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser | null | undefined;
  cart$: Observable<ShoppingCart> | undefined;
  // shoppingCart: ShoppingCart| null | undefined;
  shoppingCartItemCount: number | undefined;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
    // this.cart$.snapshotChanges().subscribe(cart => {
    //   let shoppingCart = cart.payload.val();
    //   this.shoppingCartItemCount = 0;
    //   for(let productId in shoppingCart?.items){
    //     // @ts-ignore
    //     this.shoppingCartItemCount += shoppingCart?.items[productId].quantity;
    //   }
    // });
  }
}
