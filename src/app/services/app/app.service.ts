import { Injectable } from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  menuOpen: boolean = false;

  constructor() { }

  openMenu() {
    this.menuOpen = !this.menuOpen;
  }

  sendEmail() {
    return of(true);
  }
}
