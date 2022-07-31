import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {getSelectedPaymentType, getSelectedShippingType} from "../../store/order/order.selector";
import {Observable} from "rxjs";
import {PaymentType, ShippingType} from "../../model/cart-item.model";
import {changePaymentType, changeShippingType} from "../../store/order/order.action";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  selectedShippingType$: Observable<ShippingType> = this.store.select(getSelectedShippingType);
  selectedPaymentType$: Observable<PaymentType> = this.store.select(getSelectedPaymentType);

  constructor(private store: Store<any>) {
  }

  changeSelectedShippingType(shippingType: ShippingType) {
    this.store.dispatch(changeShippingType({newShippingType: shippingType}));
  }

  changeSelectedPaymentType(paymentType: PaymentType) {
    this.store.dispatch(changePaymentType({newPaymentType: paymentType}));
  }
}
