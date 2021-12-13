import {Component, OnInit} from '@angular/core';
import {faCartPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth/auth.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../../services/cart/cart.service";
import {Router} from "@angular/router";
import {NavigationEvent} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model";

@Component({
  selector: 'aprosag-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser = faUser;
  faCart = faCartPlus;
  faSignOutAlt = faSignOutAlt;

  constructor(public authService: AuthService, private modalService: NgbModal, public cartService: CartService, private router: Router) {
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

  openCartModal(content: any) {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    } else {
      const modalRef = this.modalService.open(content, {backdrop: true, modalDialogClass: 'custom-dialog'});
      modalRef.result.then((result) => {
        console.log(result);
      }, (error) => {
        //console.error(error.message);
      })
    }
  }
}
