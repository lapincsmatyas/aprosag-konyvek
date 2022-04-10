import {Component} from '@angular/core';
import {ItemsService} from "./services/item/items.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {LoadingService} from "./services/loading/loading.service";
import {AppService} from "./services/app/app.service";
import {UserService} from "./services/user/user.service";
import {AuthService} from "./services/auth/auth.service";
import {faAddressCard} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'aprosag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading: boolean = false;
  public openMenu: boolean = false;

  constructor(private itemsService: ItemsService,
              private router: Router,
              public userService: UserService,
              public authService: AuthService,
              public appService: AppService,
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
