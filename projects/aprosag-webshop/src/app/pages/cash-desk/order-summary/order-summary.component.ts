import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
  }

}
