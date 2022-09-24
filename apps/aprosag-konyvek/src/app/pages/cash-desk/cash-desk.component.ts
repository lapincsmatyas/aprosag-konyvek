import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {CartService} from "../../services/cart/cart.service";
import {MatStepper, StepperOrientation} from "@angular/material/stepper";
import {UserService} from "../../services/user/user.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

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
