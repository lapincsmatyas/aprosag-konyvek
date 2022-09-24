import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from "rxjs/operators";
import {loadSettings, loadSettingsByHttp} from "./settings.action";
import {EMPTY, of} from "rxjs";
import {SettingsService} from "../../../../../../apps/aprosag-konyvek/src/app/services/settings.service";

@Injectable()
export class SettingsEffects {
  constructor(private actions$: Actions, private settingsService: SettingsService) {
  }

  loadSettingsByHttp = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSettingsByHttp),
      switchMap(action => {
        return this.settingsService.loadSettings()
          .pipe(
            map(settings => {
              return loadSettings({settings})
            }),
            catchError((error) => {
              console.log(error)
              return EMPTY;
            })
          )
      })
    )
  });
}
