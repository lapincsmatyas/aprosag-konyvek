import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'aprosag-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  @Input()
  value: number;

  @Output()
  valueChange = new EventEmitter<number>();

  constructor() {
    this.value = 0;
  }

  ngOnInit(): void {

  }

  changeValue(amount: number){
    this.value += amount;
    if(this.value < 0) this.value = 0;

    this.valueChange.emit(this.value);
  }

}
