import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../model/user.model";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../services/order/order.service";
import {Order} from "../../model/order.model";
import {UserDto} from "../../model/dto/user.dto";
import {UserService} from "../../services/user/user.service";
import {ItemsService} from "../../services/item/items.service";
import {Item} from "../../model/item.model";
import {CartService} from "../../services/cart/cart.service";

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
              private authService: AuthService,
              private cartService: CartService) {
  }

  logout() {
    this.authService.logout().then(() => {
      this.cartService.emptyCart();
    });
  }
}
