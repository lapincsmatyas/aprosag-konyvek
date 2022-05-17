import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pages: MenuItem[] = [
    {
      label: "Termékek",
      routerLink: "items"
    },
    {
      label: "Rendelések",
      routerLink: "orders"
    },
    {
      label: "Felhasználók",
      routerLink: "users"
    },
    {
      label: "Hírlevél",
      routerLink: "newsletter"
    }
  ]
}
