import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart/cart.service";
import {OrderService} from "../../../services/order/order.service";
import {ShippingType} from "../../../model/cart-item.model";
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: 'aprosag-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.scss']
})
export class ShippingOptionsComponent {

  constructor(
    public settingsService: SettingsService,
    public orderService: OrderService) {
  }
}
