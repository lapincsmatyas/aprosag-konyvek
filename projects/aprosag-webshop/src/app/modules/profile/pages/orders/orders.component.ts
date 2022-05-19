import { Component, OnInit } from '@angular/core';
import {Order} from "../../../../model/order.model";
import {UserService} from "../../../../services/user/user.service";
import {OrderService} from "../../../../services/order/order.service";

@Component({
  selector: 'aprosag-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: {order: Order, open: boolean}[] = [];

  constructor(private userService: UserService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      if (user) {
        this.orderService.getOrders().subscribe((orders) => {
          this.orders = orders.map((order) => {
            return {order, open: false}
          });
        });
      }
    })
  }

}
