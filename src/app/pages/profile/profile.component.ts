import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../model/user.model";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../services/order/order.service";
import {Order} from "../../model/order.model";

@Component({
  selector: 'aprosag-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {
  menus: string[] = ["Adataim","Rendeléseim","Kedvenceim", "Kijelentkezés"]
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
  public orders: Order[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private orderService: OrderService) {
    this.authService.user$.subscribe((user) => {
      if(user) {
        this.user = user;
        console.log(this.user);
        this.profileForm.patchValue(user);
        orderService.getOrdersForUser(user).subscribe((orders) => {
          this.orders = orders;
        })
      }
    })
  }



  saveData() {
    this.authService.updateProfile(this.profileForm.value).then(() => {
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
      this.toastr.error("Kérjük, próbáld meg később!","Hiba történt a megerősítő Email elküldése közben!")
      verificationRef.unsubscribe();
    })
  }

  logout() {
    this.authService.logout().then(() => {
    })
  }

  changeMenu(menu: string) {
    if(menu == "Kijelentkezés")
      this.logout();

    if(menu == "Kedvenceim")
      return;

    this.selectedMenu = menu;
  }
}
