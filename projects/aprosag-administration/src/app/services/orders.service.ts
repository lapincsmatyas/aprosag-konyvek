import { Injectable } from '@angular/core';
import {Item} from "../model/item.model";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Order} from "../model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: AngularFirestore) { }

  getAllOrders(): Observable<Order[]>{
    return this.firestore.collection<Order>('orders').valueChanges({idField: 'id'});
  }
}
