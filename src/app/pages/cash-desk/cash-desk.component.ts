import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {OrderService} from "../../services/order/order.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'aprosag-cash-desk',
  templateUrl: './cash-desk.component.html',
  styleUrls: ['./cash-desk.component.scss']
})
export class CashDeskComponent implements OnInit {
  profileForm = this.fb.group({
      email: [''],
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

  constructor(private fb: FormBuilder, private authService: AuthService, private orderService: OrderService, private toastr: ToastrService, private router: Router) {
    authService.user$.subscribe((user) => {
      if(user){
        this.profileForm.patchValue({
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
          companyName: user.companyName,
          taxNumber: user.taxNumber,
          country: user.country,
          city: user.city,
          address: user.address,
          zipCode: user.zipCode,
          phoneNumber: user.phoneNumber
        })
      }
    })
  }

  ngOnInit(): void {
  }

  sendOrder() {
    this.orderService.placeOrder(this.profileForm.value)?.then((result) => {
      this.toastr.success("Rendelés leadása sikeres!");
      this.router.navigateByUrl("items");
    }, (error) => {
      this.toastr.error("Valami hiba történt a rendelés leadásakor!")
    });
  }
}
