import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../model/item.model";
import {ItemsService} from "../../services/items.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take, takeUntil} from "rxjs/operators";
import {Order} from "../../model/order.model";
import {OrderService} from "../../services/orders.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnDestroy {
  destroy = new Subject()

  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) {
    this.orderService.getAllOrders().pipe(takeUntil(this.destroy)).subscribe(result => {
      this.orders = result;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  openOrder(orderId: string) {
    this.router.navigate([orderId], {relativeTo: this.route});
  }
}
