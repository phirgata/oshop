import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { AppUser } from 'app/shared/models/app-user';
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit /* implements OnDestroy or async pipe */ {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
