import {Component, EventEmitter, Output} from '@angular/core';
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
      firstName: ['Elek', Validators.required],
      lastName: ['Teszt', Validators.required],
      companyName: [''],
      taxNumber: [''],
      country: ['Hungary', Validators.required],
      city: ['Mosonmagyaróvár', Validators.required],
      address: ['Alma utca 7', Validators.required],
      zipCode: ['9200', Validators.required],
      emailAddress: ['piros@alma.hu', [Validators.required, Validators.email]],
      phoneNumber: ['+36201231234'],
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
