import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {CartService} from "../../../services/cart/cart.service";

@Component({
  selector: 'aprosag-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class PaymentOptionsComponent implements OnInit {

  constructor(public cartService: CartService, public orderService: OrderService) { }

  ngOnInit(): void {

  }

}
