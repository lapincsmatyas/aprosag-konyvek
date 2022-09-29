import { createAction, props } from '@ngrx/store';
import {Settings} from "./settings.model";

export const loadSettingsByHttp = createAction(
  '[Settings] Load Settings By Http'
)

export const loadSettings = createAction(
  '[Settings] Load Settings',
  props<{ settings: Settings }>()
);
