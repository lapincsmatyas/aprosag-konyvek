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
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'aprosag-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faCheckCircle = faCheckCircle;

  menus: string[] = ["Adataim", "Rendeléseim", "Kedvenceim"]
  selectedMenu = this.menus[0];

  profileForm = this.fb.group({
      email: [''],
      username: [''],
      lastName: [''],
      firstName: [''],
      companyName: [''],
      taxNumber: [''],
      country: [''],
      city: [''],
      address: [''],
      zipCode: [''],
      phoneNumber: ['']
    }
  )

  public user: User | null = null;
  public orders: { order: Order, open: boolean }[] = [];

  public favorites: Item[] = [];

  constructor(private fb: FormBuilder,
              public userService: UserService,
              private toastr: ToastrService,
              public itemService: ItemsService,
              public authService: AuthService,
              private cartService: CartService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.userService.user.subscribe((user) => {
      this.profileForm.patchValue(user || new User());
      if (user) {
        this.orderService.getOrders().subscribe((orders) => {
          this.orders = orders.map((order) => {
            return {order, open: false}
          });
        });

        this.favorites = this.itemService.getItemsByIds(user.favorites);
      }
    })
  }

  saveData() {
    this.userService.updateUserData(this.profileForm.value).then(() => {
      this.toastr.success('Profil sikeresen elmentve!');
    }).catch(() => {
      this.toastr.error('Sajnáljuk, valami hiba történt :(');
    });
  }

  resendVerificationEmail() {
    const verificationRef = this.authService.sendEmailVerification().subscribe((result) => {
      this.toastr.success("Megerősítő Email elküldve!");
      verificationRef.unsubscribe();
    }, (error) => {
      this.toastr.error("Kérjük, próbáld meg később!", "Hiba történt a megerősítő Email elküldése közben!")
      verificationRef.unsubscribe();
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.cartService.emptyCart();
    });
  }

  changeMenu(menu: string) {
    if (menu == "Kijelentkezés")
      this.logout();

    this.selectedMenu = menu;
  }
}
