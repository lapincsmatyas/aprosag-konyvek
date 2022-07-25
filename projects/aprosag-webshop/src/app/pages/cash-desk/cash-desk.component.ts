import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {OrderService} from "../../services/order/order.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart/cart.service";
import {MatStepper, StepperOrientation} from "@angular/material/stepper";
import {AddedToCartComponent} from "../../shared/popups/added-to-cart/added-to-cart.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SuccessfulOrderComponent} from "../../shared/popups/successful-order/successful-order.component";
import {UserService} from "../../services/user/user.service";
import {LoadingService} from "../../services/loading/loading.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Order} from "../../model/order.model";
import {User} from "../../model/user.model";

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

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder,
              private orderService: OrderService,
              public userService: UserService,
              private loadingService: LoadingService,
              private toastr: ToastrService,
              private router: Router,
              public authService: AuthService,
              private modalService: NgbModal,
              public breakpointObserver: BreakpointObserver,
              public cartService: CartService) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));


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
    this.loadingService.addProcess('send-order', {transparent: true});

    this.orderService.placeOrder(this.profileForm.value as User, this.profileForm.get('comment')?.value || "")
      ?.then((result) => {
        this.loadingService.removeProcess('send-order');
        const modalRef = this.modalService.open(SuccessfulOrderComponent, {
          backdrop: 'static',
          keyboard: false,
          backdropClass: 'modal-dialog-backdrop',
          modalDialogClass: 'modal-dialog-centered succesful-order-dialog'
        });

        modalRef.componentInstance.orderNumber = result;
      }, (error) => {
        this.loadingService.removeProcess('send-order');
        this.toastr.error("Valami hiba történt a rendelés leadásakor!")
      });
  }

  goToSignup() {
    this.router.navigateByUrl('signup');
  }

  login() {
    const email = this.loginForm.get('password')?.value;
    const password = this.loginForm.get('password')?.value;
    if(!email || !password) return;

    this.authService.login(email, password).then((result) => {
    }, (error) => {
      this.toastr.error('Sikertelen bejelentkezés!', 'Hiba');
    })
  }

}
