import {Component} from '@angular/core';
import {OrderService} from "../../../services/order/order.service";
import {SettingsService} from "../../../../../../../libs/items/src/lib/services/settings.service";

@Component({
  selector: 'aprosag-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class PaymentOptionsComponent  {
  constructor(public orderService: OrderService, public settingsService: SettingsService) {
  }
}
