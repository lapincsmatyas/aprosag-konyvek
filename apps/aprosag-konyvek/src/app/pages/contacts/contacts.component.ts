import {Component} from '@angular/core';
import {LoadingService} from "../../services/loading/loading.service";
import {AppService} from "../../services/app/app.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EmailSentComponent} from "./email-sent/email-sent.component";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'aprosag-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  contactForm = this.fb.group({
    name: [''],
    email: [''],
    text: [''],
    dataProtection: false
  });

  constructor(private loadingService: LoadingService,
              private appService: AppService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  sendEmail(){
    this.loadingService.addProcess('send-email', {transparent: true});
    this.appService.sendEmail().subscribe((result) => {
      this.loadingService.removeProcess('send-email');
      let modalRef = this.modalService.open(EmailSentComponent, {
        backdropClass: 'modal-dialog-backdrop',
        modalDialogClass: 'modal-dialog-centered succesful-order-dialog'
      });
      modalRef.closed.subscribe(() => {
        console.log(this.contactForm.value);
        this.contactForm.reset();
      })
    }, (error: any) => {
      this.loadingService.removeProcess('send-order');
      this.toastr.error("Valami hiba történt az email küldésekor!")
    });
  }
}
