import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartItem} from "../../../model/cart-item.model";
import {Item} from "../../../model/item.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'aprosag-added-to-cart',
  templateUrl: './added-to-cart.component.html',
  styleUrls: ['./added-to-cart.component.scss']
})
export class AddedToCartComponent {
  @Input() public item: Item | null = null;
  @Input() public amount: number = 0;

  constructor(private router: Router, private modal: NgbActiveModal) { }

  backToShopping() {
    this.modal.close();
  }

  goToCart(){
    this.modal.close();
    this.router.navigateByUrl("cart");
  }
}
