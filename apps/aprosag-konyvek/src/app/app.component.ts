import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { LoadingService } from "./services/loading/loading.service";
import { AppService } from "./services/app/app.service";
import { UserService } from "./services/user/user.service";
import { AuthService } from "./services/auth/auth.service";
import { BreakpointObserver } from "@angular/cdk/layout";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'aprosag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'navigationBarAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, left: '-300px' }),
            animate('100ms',
              style({ opacity: 1, left: 0 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, left: 0 }),
            animate('100ms',
              style({ opacity: 0, left: '-300px' }))
          ]
        )
      ]
    )
  ]
})
export class AppComponent {
  public mobile = false;

  constructor(private router: Router,
              public userService: UserService,
              public authService: AuthService,
              public appService: AppService,
              public loadingService: LoadingService,
              public breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe('(min-width: 588px)')
      .subscribe((result) => {
        this.mobile = !result.matches;
      })

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
