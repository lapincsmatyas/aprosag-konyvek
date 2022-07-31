import { Component } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {PaymentType} from "../../../model/cart-item.model";

@Component({
  selector: 'aprosag-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class PaymentOptionsComponent  {
  PaymentType = PaymentType;

  constructor(public orderService: OrderService) {
  }
}
