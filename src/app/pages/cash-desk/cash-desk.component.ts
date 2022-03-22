import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {OrderService} from "../../services/order/order.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart/cart.service";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'aprosag-cash-desk',
  templateUrl: './cash-desk.component.html',
  styleUrls: ['./cash-desk.component.scss']
})
export class CashDeskComponent implements  AfterViewInit {
  @ViewChild(MatStepper)
    stepper!: MatStepper;

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }

  profileForm = this.fb.group({
      profile: this.fb.group({
        uid: [''],
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
      }),
      comment: ['']
    }
  )

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private orderService: OrderService,
              private toastr: ToastrService,
              private router: Router,
              public cartService: CartService) {
    authService.user$.subscribe((user) => {
      if (user) {
        this.profileForm.get('profile')?.patchValue({
          uid: user.uid,
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
          companyName: user.companyName,
          taxNumber: user.taxNumber,
          country: user.country,
          city: user.city,
          address: user.address,
          zipCode: user.zipCode,
          phoneNumber: user.phoneNumber,
        })
      }
    })

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
  }

  sendOrder() {
    this.orderService.placeOrder(this.profileForm.value, this.profileForm.get('comment')?.value)?.then((result) => {
      this.toastr.success("Rendelés leadása sikeres!");
      this.router.navigateByUrl("items");
    }, (error) => {
      this.toastr.error("Valami hiba történt a rendelés leadásakor!")
    });
  }
}
