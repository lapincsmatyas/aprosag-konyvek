import {Component} from '@angular/core';
import {ItemsService} from "./services/item/items.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {NavigationEvent} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model";
import {UserService} from "./services/user/user.service";
import {LoadingService} from "./services/loading/loading.service";

@Component({
  selector: 'aprosag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;

  constructor(private itemsService: ItemsService,
              private router: Router,
              public loadingService: LoadingService
  ) {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loadingService.addProcess('navigation_start');
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loadingService.removeProcess('navigation_start');
          break;
        }
        default: {
          break;
        }
      }
    })
  }
}
