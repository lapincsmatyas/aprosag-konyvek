import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'app-billing-data',
  templateUrl: './billing-data.component.html',
  styleUrls: ['./billing-data.component.scss']
})
export class BillingDataComponent {
  @Output()
  nextButtonClicked = new EventEmitter<boolean>();

  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private orderService: OrderService) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: [''],
      taxNumber: [''],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      comment: ['']
    })
  }

  next() {
    this.profileForm.markAllAsTouched();

    if (this.profileForm.invalid) {
      this.toastr.error("Az adatok hibásan vannak kitöltve!");
      return;
    }

    this.orderService.setBillingAddress(this.profileForm.value);
    this.nextButtonClicked.next(true);
  }
}
