import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {debug} from "util";

@Component({
  selector: 'aprosag-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input()
  value: number = 0;

  @Input()
  allowZero: boolean = false;

  @Input()
  maxValue: number | undefined;

  @Output()
  valueChange = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
    this.value = this.allowZero ? 0 : 1;
  }

  changeValue(amount: number){
    this.value += amount;
    if(this.maxValue && this.value > this.maxValue){
      this.value = this.maxValue;
    }

    if(this.allowZero && this.value < 0){
      this.value = 0;
    } else if(!this.allowZero && this.value < 1){
      this.value = 1;
    }

    this.valueChange.emit(this.value);
  }
}
