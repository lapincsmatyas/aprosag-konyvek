import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../services/user/user.service";
import {CartService} from "../../services/cart/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationComponent} from "../shared/popups/confirmation/confirmation.component";

@Component({
  selector: 'aprosag-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  menus: {text: string, url: string}[] = [
    {text: "Adataim", url: "personal-data"},
    {text: "Rendeléseim", url: "orders"},
    {text: "Kedvenceim", url: "favorites"},
  ]
  constructor(private fb: FormBuilder,
              public userService: UserService,
              private toastr: ToastrService,
              public authService: AuthService,
              private cartService: CartService,
              private modalService: NgbModal) {
  }

  logout() {
    console.log("lol");
    let modalRef = this.modalService.open(ConfirmationComponent, {
      backdropClass: 'modal-dialog-backdrop',
      modalDialogClass: 'modal-dialog-centered'
    });
    modalRef.componentInstance.title = "Biztos?";
    modalRef.componentInstance.text = "Biztos ki szeretnél jelentkezni?";
    modalRef.closed.subscribe((result: boolean) => {
      if(!result) return;

      this.authService.logout().then(() => {
        this.cartService.emptyCart();
      });
    })
  }
}
