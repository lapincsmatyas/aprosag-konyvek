import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../model/item.model";
import {Router} from "@angular/router";
import {CartService} from "../../../services/cart/cart.service";
import {AddedToCartComponent} from "../../../shared/popups/added-to-cart/added-to-cart.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'aprosag-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input()
  public item: Item;

  isFavourite = false;

  constructor(private router: Router,
              private cartService: CartService,
              private modalService: NgbModal) {
    this.item = new Item();
  }

  openItem() {
    this.router.navigate(['/items', this.item.id]);
  }

  addItemToCart() {
    this.cartService.addItemToCart(this.item, 1);

    const modalRef = this.modalService.open(AddedToCartComponent, {
      backdrop: true,
      backdropClass: 'modal-dialog-backdrop',
      modalDialogClass: 'modal-dialog-centered added-to-cart-dialog'
    });
    modalRef.componentInstance.item = this.item;
    modalRef.componentInstance.amount = 1;
  }

}
