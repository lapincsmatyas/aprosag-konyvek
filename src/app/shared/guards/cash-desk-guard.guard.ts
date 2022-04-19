import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CartService} from "../../services/cart/cart.service";

@Injectable({
  providedIn: 'root'
})
export class CashDeskGuardGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*
        if(!this.cartService.valid){
          this.router.navigateByUrl('items');
          return false;
        } else {
          return true;
        }

     */
    return true;
  }

}
