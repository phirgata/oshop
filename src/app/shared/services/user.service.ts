import { Injectable } from '@angular/core';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { FirebaseObjectObservable } from '@angular/fire/database-deprecated';
import * as firebase from 'firebase';
import { AppUser } from './../models/app-user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
  // get(uid: string): FirebaseObjectObservable<AppUser> {
  //   return this.db.object('/users/' + uid);
  // }
}
