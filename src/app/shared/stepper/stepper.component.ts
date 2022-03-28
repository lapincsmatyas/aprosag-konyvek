import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'aprosag-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent  {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  @Input()
  value: number;

  @Input()
  allowZero: boolean;

  @Output()
  valueChange = new EventEmitter<number>();

  constructor() {
    this.allowZero = false;
    this.value = this.allowZero ? 0 : 1;
  }

  changeValue(amount: number){
    this.value += amount;

    if(this.allowZero && this.value < 0){
      this.value = 0;
    } else if(!this.allowZero && this.value < 1){
      this.value = 1;
    }

    this.valueChange.emit(this.value);
  }

}
