import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {CartService} from "../../../services/cart/cart.service";

@Component({
  selector: 'aprosag-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.scss']
})
export class ShippingOptionsComponent implements OnInit {

  constructor(public cartService: CartService) {

  }

  ngOnInit(): void {

  }

}
