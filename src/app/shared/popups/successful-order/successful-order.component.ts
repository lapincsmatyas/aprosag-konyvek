import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'aprosag-successful-order',
  templateUrl: './successful-order.component.html',
  styleUrls: ['./successful-order.component.scss']
})
export class SuccessfulOrderComponent {
  @Input() orderNumber: string = "";

  constructor(private router: Router) { }

  goToItems() {
    this.router.navigateByUrl("items");
  }
}
