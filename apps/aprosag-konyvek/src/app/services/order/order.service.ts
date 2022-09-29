import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {
  getBillingAddress,
  getSelectedPaymentType,
  getSelectedShippingType
} from "../../../../../../libs/items/src/lib/+state/order/order.selector";
import {
  changePaymentType,
  changeShippingType,
  setBillingAddress
} from "../../../../../../libs/items/src/lib/+state/order/order.action";
import {BillingAddress, PaymentType, ShippingType} from 'data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  selectedShippingType$: Observable<ShippingType | null> = this.store.select(getSelectedShippingType);
  selectedPaymentType$: Observable<PaymentType | null> = this.store.select(getSelectedPaymentType);
  billingAddress$: Observable<BillingAddress | null> = this.store.select(getBillingAddress);

  constructor(private store: Store<any>) {
  }

  changeSelectedShippingType(shippingType: ShippingType) {
    this.store.dispatch(changeShippingType({newShippingType: shippingType}));
  }

  changeSelectedPaymentType(paymentType: PaymentType) {
    this.store.dispatch(changePaymentType({newPaymentType: paymentType}));
  }

  setBillingAddress(billingAddress: BillingAddress){
    this.store.dispatch(setBillingAddress({newBillingAddress: billingAddress}));

  }
}
