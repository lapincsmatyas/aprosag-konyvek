import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'aprosag-cart-modal',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent {
  constructor(private modal: NgbActiveModal) {
  }

  closeModal(){
    this.modal.close()
  }
}
