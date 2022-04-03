import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {OrderService} from "../../services/order/order.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart/cart.service";
import {MatStepper} from "@angular/material/stepper";
import {AddedToCartComponent} from "../../shared/popups/added-to-cart/added-to-cart.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SuccessfulOrderComponent} from "../../shared/popups/successful-order/successful-order.component";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'aprosag-cash-desk',
  templateUrl: './cash-desk.component.html',
  styleUrls: ['./cash-desk.component.scss']
})
export class CashDeskComponent implements AfterViewInit {
  @ViewChild(MatStepper)
  stepper!: MatStepper;

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

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
              private orderService: OrderService,
              public userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService,
              private modalService: NgbModal,
              public cartService: CartService) {
    userService.user.subscribe((user) => {
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
      const modalRef = this.modalService.open(SuccessfulOrderComponent, {
        backdrop: 'static',
        keyboard: false,
        backdropClass: 'modal-dialog-backdrop',
        modalDialogClass: 'modal-dialog-centered succesful-order-dialog'
      });
      modalRef.componentInstance.orderNumber = result;

    }, (error) => {
      this.toastr.error("Valami hiba történt a rendelés leadásakor!")
    });
  }

  goToSignup() {
    this.router.navigateByUrl('signup');
  }

  login() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then((result) => {
    }, (error) => {
      this.toastr.error('Sikertelen bejelentkezés!', 'Hiba');
    })
  }

}
