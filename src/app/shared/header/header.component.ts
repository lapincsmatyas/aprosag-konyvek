import {Component, OnInit} from '@angular/core';
import {faCartPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth/auth.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../../services/cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationEvent} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model";
import {AddedToCartComponent} from "../popups/added-to-cart/added-to-cart.component";
import {CartModalComponent} from "./cart-modal/cart-modal.component";

@Component({
  selector: 'aprosag-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser = faUser;
  faCart = faCartPlus;
  faBars = faBars;
  faSignOutAlt = faSignOutAlt;

  visible = false;

  constructor(public authService: AuthService,
              private modalService: NgbModal,
              public cartService: CartService,
              private activatedRoute: ActivatedRoute,
              public router: Router) {
    router.events.subscribe((event) => {
      this.modalService.dismissAll();
    })
  }

  logout() {
    this.authService.logout().then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    })
  }

  openCartModal() {
    if(this.router.url === '/cart' || this.router.url === '/cash-desk')
      return;

    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    } else {
      const modalRef = this.modalService.open(CartModalComponent, {backdrop: true, modalDialogClass: 'cart-dialog'});
      modalRef.result.then((result) => {
        console.log(result);
      }, (error) => {
        //console.error(error.message);
      })
    }
  }

  openMenu() {
    this.visible = true;
  }
}
