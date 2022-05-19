import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import {ItemComponent} from "./pages/item/item.component";
import {ItemsComponent} from "./items.component";
import {GalleryComponent} from "./components/gallery/gallery.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ItemComponent,
    ItemsComponent,
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    SharedModule
  ]
})
export class ItemsModule { }
