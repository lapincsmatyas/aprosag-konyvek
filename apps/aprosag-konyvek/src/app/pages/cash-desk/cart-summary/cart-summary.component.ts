import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart/cart.service";
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  constructor(public cartService: CartService, public orderService: OrderService) { }

  ngOnInit(): void {
  }

}
