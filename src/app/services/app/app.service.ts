import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  menuOpen: boolean = true;

  constructor() { }

  openMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
