import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {getPaymentTypes, getShippingTypes} from "../store/settings/settings.selector";
import {doc, docData, Firestore} from "@angular/fire/firestore";
import {catchError, map} from "rxjs/operators";
import {Item} from "../store/item/item.model";
import {Settings} from "../store/settings/settings.model";
import {loadSettingsByHttp} from "../store/settings/settings.action";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  shippingTypes$ = this.store.select(getShippingTypes);
  paymentTypes$ = this.store.select(getPaymentTypes);

  constructor(private store: Store<any>, private firestore: Firestore) { }

  loadSettingsByHttp() {
    this.store.dispatch(loadSettingsByHttp());
  }

  loadSettings() {
    return docData(doc(this.firestore, `meta/settings`)).pipe(
      map((settings) => {
        return settings as Settings
      })
    )
  }
}
