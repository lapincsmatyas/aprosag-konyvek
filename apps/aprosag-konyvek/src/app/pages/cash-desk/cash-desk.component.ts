import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {CartService} from "../../services/cart/cart.service";
import {MatStepper, StepperOrientation} from "@angular/material/stepper";
import {UserService} from "../../services/user/user.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessfulOrderComponent } from '../../shared/popups/successful-order/successful-order.component';

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
              private router: Router,
              public orderService: OrderService,
              private modalService: NgbModal,
              public cartService: CartService) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  sendOrder() {
    const modalRef = this.modalService.open(SuccessfulOrderComponent, {
      backdrop: true,
      backdropClass: 'modal-dialog-backdrop',
      modalDialogClass: 'modal-dialog-centered succesful-order-dialog'
    });
    modalRef.componentInstance.orderNumber = '123456789';

    modalRef.result.then((result) => {
      console.log(result);
    }, (error) => {
      //console.error(error.message);
    })
  }

  gotToCart() {
    this.router.navigateByUrl('/cart')
  }
}
