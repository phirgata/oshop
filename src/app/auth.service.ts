import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
//import { Observable } from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(e => console.log(e));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
        switchMap(user => {
          if (user) {
            return this.userService.get(user.uid);
          }

          return of(null);
      }));
  }

}
