import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { TableModule } from 'primeng/table';
import { ItemComponent } from './components/item/item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ItemResolver } from '../../../../../aprosag-konyvek/src/app/resolvers/item.resolver';
import { ItemsComponent } from './items.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [ItemsComponent, ItemListComponent, ItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ItemsComponent,
        children: [
          {
            path: '',
            component: ItemListComponent,
          },
          {
            path: 'new',
            component: ItemComponent,
          },
          {
            path: ':id',
            resolve: { item: ItemResolver },
            component: ItemComponent,
          },
        ]
      },
    ]),
    TableModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    InputTextareaModule
  ],
})
export class ItemsModule {}
