import { Component } from '@angular/core';
import { Item } from "items";
import { SettingsService } from "../../../../../../libs/items/src/lib/services/settings.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../../services/cart/cart.service";
import { AddedToCartComponent } from "../../shared/popups/added-to-cart/added-to-cart.component";
import { ItemsFacade } from "items";

@Component({
  selector: 'aprosag-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent{
  constructor(public itemsFacade: ItemsFacade,
              public settingsService: SettingsService,
              private router: Router,
              private cartService: CartService,
              private modalService: NgbModal) {
  }

  itemClicked(item: Item){
    this.router.navigate(['/items', item.id]);
  }

  addItemToCart(item: Item) {
    this.cartService.addItemToCart(item, 1);

    const modalRef = this.modalService.open(AddedToCartComponent, {
      backdrop: true,
      backdropClass: 'modal-dialog-backdrop',
      modalDialogClass: 'modal-dialog-centered added-to-cart-dialog'
    });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.amount = 1;
  }
}
