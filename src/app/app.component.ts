import {Component} from '@angular/core';
import {ItemsService} from "./services/item/items.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {NavigationEvent} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'aprosag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;

  constructor(private itemsService: ItemsService,
              private router: Router,
              private userService: UserService
  ) {

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    })
  }
}
