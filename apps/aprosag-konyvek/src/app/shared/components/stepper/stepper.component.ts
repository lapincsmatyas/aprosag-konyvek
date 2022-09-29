import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {debug} from "util";

@Component({
  selector: 'aprosag-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  @Input()
  value: number;

  @Input()
  allowZero: boolean;

  @Input()
  maxValue: number | undefined;

  @Output()
  valueChange = new EventEmitter<number>();

  constructor() {
    this.allowZero = false;
    this.value = this.allowZero ? 0 : 1;
  }

  increaseValue(amount: number = 1) {
    if (this.maxValue && this.value >= this.maxValue)
      return;

    this.value += amount;
    this.valueChange.emit(this.value);
  }

  decreaseValue(amount: number = 1) {
    if (this.value <= (this.allowZero ? 0 : 1))
      return;

    this.value -= amount;
    this.valueChange.emit(this.value);
  }

  changeValue(amount: number) {
    this.value += amount;
    if (this.maxValue && this.value > this.maxValue) {
      this.value = this.maxValue;
    }

    if (this.allowZero && this.value < 0) {
      this.value = 0;
    } else if (!this.allowZero && this.value < 1) {
      this.value = 1;
    }

    this.valueChange.emit(this.value);
  }

}
