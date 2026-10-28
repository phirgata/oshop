import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { UserService } from 'app/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin));
  }
}
