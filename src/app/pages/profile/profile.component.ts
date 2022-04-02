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

@Component({
  selector: 'aprosag-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  menus: string[] = ["Adataim", "Rendeléseim", "Kedvenceim", "Kijelentkezés"]
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

  constructor(private fb: FormBuilder,
              public userService: UserService,
              private toastr: ToastrService,
              private authService: AuthService,
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
    })
  }

  changeMenu(menu: string) {
    if (menu == "Kijelentkezés")
      this.logout();

    if (menu == "Kedvenceim")
      return;

    this.selectedMenu = menu;
  }
}
