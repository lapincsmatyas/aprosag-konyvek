import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../model/user.model";
import {OrderService} from "../../../services/order/order.service";
import {Order} from "../../../model/order.model";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../services/auth/auth.service";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'aprosag-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  faCheckCircle = faCheckCircle;

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

  public orders: { order: Order, open: boolean }[] = [];

  public user: User | null = null;


  constructor(public userService: UserService,
              private fb: FormBuilder,
              public authService: AuthService,
              private orderService: OrderService,
              private toastr: ToastrService
              ) { }

  ngOnInit(): void {
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
}
