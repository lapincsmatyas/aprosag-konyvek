import {Component} from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {SettingsService} from "../../../../../../../libs/items/src/lib/services/settings.service";

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
