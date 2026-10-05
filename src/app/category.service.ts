import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    //return this.db.list('/categories');
    // return this.db.list('/categories', {
    //   queryFn: {
    //     orderByChild: 'name'
    //   }
    // }).valueChanges();
    return this.db.list('/categories', ref => {
      return ref.orderByChild('name')
    }).snapshotChanges().pipe(
      map(changes => changes.map(c => ({
            key: c.key,
            ...(c.payload.val() as object)
          })
        )
      )
    );
  }
}
