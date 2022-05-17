import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'aprosag-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent{
  @Input()
  public title: string = "Biztos?";

  @Input()
  public text: string = "";

  constructor(private activatedModal: NgbActiveModal) { }

  accept() {
    this.activatedModal.close(true);
  }

  decline() {
    this.activatedModal.close(false);
  }
}
