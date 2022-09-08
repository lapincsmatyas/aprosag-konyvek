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



  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder,
              public userService: UserService,
              public authService: AuthService,
              public breakpointObserver: BreakpointObserver,
              public cartService: CartService) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  sendOrder() {
  }
}
