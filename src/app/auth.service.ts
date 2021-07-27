import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, of} from "rxjs";
import * as firebase from "firebase";
import {ActivatedRoute} from "@angular/router";
import {AppUser} from "./models/app-user";
import {map, switchMap} from "rxjs/operators";
import {UserService} from "./user.service";
import {AngularFireObject} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  user$: Observable<firebase.default.User> = null;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    // @ts-ignore
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user)
            return this.userService.get(user.uid).valueChanges();
          return of(null);
        }));
  }
}
