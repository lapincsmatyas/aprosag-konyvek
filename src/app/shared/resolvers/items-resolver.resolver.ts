import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ItemsService} from "../../services/item/items.service";
import {Item} from "../../model/item.model";
import {delay, map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemsResolverResolver implements Resolve<Item[]> {
  constructor(private itemService: ItemsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item[]> {
    /* return this.itemService.getAllItems().pipe(
      take(1)
    ); */
    return of([]);
  }
}
