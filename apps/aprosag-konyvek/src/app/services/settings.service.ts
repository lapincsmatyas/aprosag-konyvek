import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {doc, docData, Firestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {
  getPaymentTypes,
  getShippingTypes,
  getSliderImages
} from "../../../../../libs/items/src/lib/+state/settings/settings.selector";
import {loadSettingsByHttp} from "../../../../../libs/items/src/lib/+state/settings/settings.action";
import {Settings} from "../../../../../libs/items/src/lib/+state/settings/settings.model";

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
