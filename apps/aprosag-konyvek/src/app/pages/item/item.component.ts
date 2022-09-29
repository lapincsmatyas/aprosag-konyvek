import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CartService} from "../../services/cart/cart.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddedToCartComponent} from "../../shared/popups/added-to-cart/added-to-cart.component";
import {Item} from "items";
import {ItemsFacade} from "../../../../../../libs/items/src/lib/+state/items/items.facade";
import {SliderImage} from "data";

@Component({
  selector: 'aprosag-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnDestroy{
  notifier = new Subject()

  public item: Item | undefined;
  public selectedImageIndex = 0;
  amount = 1;

  itemImages: SliderImage[] = [];

  constructor(private itemsFacade: ItemsFacade,
              private cartService: CartService,
              private modalService: NgbModal,
              private cdRef: ChangeDetectorRef,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.itemsFacade.getItemById$(id).pipe(takeUntil(this.notifier)).subscribe((item) => {
        this.item = item;
        this.itemImages = item?.image_urls.map(image => {
          return {src: `assets/${image}`, fullscreen: true};
        }) || [];
      });
    }
  }

  addItemToCart(item: Item) {
    if (item) {
      this.cartService.addItemToCart(item, this.amount);

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

  ngOnDestroy() {
    this.notifier.next(true);
    this.notifier.complete();
  }
}
