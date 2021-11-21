import { Component, OnInit } from '@angular/core';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'aprosag-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout().then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    })
  }
}
