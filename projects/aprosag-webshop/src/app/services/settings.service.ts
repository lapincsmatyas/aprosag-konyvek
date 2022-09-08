import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {getPaymentTypes, getShippingTypes, getSliderImages} from "../store/settings/settings.selector";
import {doc, docData, Firestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Settings} from "../store/settings/settings.model";
import {loadSettingsByHttp} from "../store/settings/settings.action";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  shippingTypes$ = this.store.select(getShippingTypes);
  paymentTypes$ = this.store.select(getPaymentTypes);
  sliderImages$ = this.store.select(getSliderImages);

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
