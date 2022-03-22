import { Component } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {CartService} from "../../../services/cart/cart.service";
import {PaymentType} from "../../../model/order.model";

@Component({
  selector: 'aprosag-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class PaymentOptionsComponent  {
  selectedPaymentType: PaymentType;

  constructor(public cartService: CartService,
              public orderService: OrderService) {
    this.selectedPaymentType = orderService.paymentTypes[0];

    console.log(this.selectedPaymentType);
  }



}
