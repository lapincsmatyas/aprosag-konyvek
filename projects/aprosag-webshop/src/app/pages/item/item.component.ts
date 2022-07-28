import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ItemsService} from "../../services/item/items.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import firebase from "firebase/compat";
import {DeprecatedItem} from "../../model/item.model";
import {ImageCacheService} from "../../services/image-cache/image-cache.service";
import {faArrowAltCircleLeft, faArrowAltCircleRight} from '@fortawesome/free-regular-svg-icons';
import {CartService} from "../../services/cart/cart.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddedToCartComponent} from "../../shared/popups/added-to-cart/added-to-cart.component";
import {UserService} from "../../services/user/user.service";
import {ItemRepository} from "../../services/item/item.repository";
import {Item} from "../../store/item/item.model";

@Component({
  selector: 'aprosag-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  public item$: Observable<Item | undefined>;
  public selectedImageIndex = 0;
  amount = 1;

  constructor(private itemRepository: ItemRepository,
              private cartService: CartService,
              private modalService: NgbModal,
              private cdRef: ChangeDetectorRef,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.item$ = id ? this.itemRepository.getItemById$(id) : of(undefined);
  }

  selectImage(i: number) {
    this.selectedImageIndex = i;
  }

  /*
  nextImage() {
    this.selectedImageIndex++;
    console.log(this.selectedImageIndex)
    if (this.selectedImageIndex >= (this.item?.image_urls ? this.item?.image_urls.length : 0))
      this.selectedImageIndex = 0;
  }
   */

  /*
  previousImage() {
    this.selectedImageIndex--;
    if (this.selectedImageIndex < 0)
      this.selectedImageIndex = (this.item?.image_urls ? this.item?.image_urls.length - 1 : 0);
  }
   */

  addItemToCart(item: Item) {
    if (item) {
      this.cartService.deprecatedAddItemToCart(item, this.amount);

      const modalRef = this.modalService.open(AddedToCartComponent, {
        backdrop: true,
        backdropClass: 'modal-dialog-backdrop',
        modalDialogClass: 'modal-dialog-centered added-to-cart-dialog'
      });
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.amount = this.amount;

      this.amount = 1;
    }
  }

  amountChanged(amount: number) {
    this.amount = amount;
  }
}
