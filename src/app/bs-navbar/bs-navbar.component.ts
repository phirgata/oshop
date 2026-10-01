import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { AppUser } from 'app/models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent /* implements OnDestroy or async pipe */ {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    //afAuth.authState.subscribe(user => this.user = user);
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  logout() {
    this.auth.logout();
  }

}
