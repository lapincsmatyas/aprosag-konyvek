import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {NewsletterService} from "../../../services/newsletter/newsletter.service";
import {Firestore} from "@angular/fire/firestore";

@Component({
  selector: 'aprosag-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  email = new FormControl('', [Validators.email, Validators.required]);

  constructor(private newsLetterService: NewsletterService) {

  }

  subscribe() {
    if(this.email.valid) {
      this.newsLetterService.subscribe(this.email.value).then((result) => {
        alert("Sikeres feliratkozás!");
      })
    } else {
      alert("Nem megfelelő email cím!");
    }
  }
}
