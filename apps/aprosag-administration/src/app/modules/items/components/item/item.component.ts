import { Component } from '@angular/core';
import { ItemsFacade, Item, COVER_TYPE } from 'items';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  itemForm = this.formBuilder.group({
      id: new FormControl<string | undefined>(undefined),
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      page_count: [0, Validators.required],
      cover_type: [COVER_TYPE.HARD_COVER, Validators.required],
      weight: [0, Validators.required],
      price: this.formBuilder.group({
        price: [0, Validators.required],
        discount_price: undefined
      }),
      publication_date: [new Date(), Validators.required],
      storage_amount: [0, Validators.required],
      isbn: ['', Validators.required],
      image_urls: ['']
    }
  )

  constructor(public itemsFacade: ItemsFacade,
              private formBuilder: NonNullableFormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.itemsFacade.getItemById$(this.activatedRoute.snapshot.params['id']).subscribe(item => {
        if (item) {
          this.itemForm.patchValue({
            ...item,
            image_urls: item.image_urls.join(',')
          });
        }
      })
    }
  }

  createItem() {
    const {
      id,
      title,
      subtitle,
      description,
      page_count,
      cover_type,
      weight,
      price,
      publication_date,
      storage_amount,
      isbn,
      image_urls
    } = this.itemForm.value;

    if (
      !this.itemForm.valid ||
      !title ||
      !subtitle ||
      !description ||
      page_count == undefined ||
      cover_type == undefined ||
      weight == undefined ||
      price == undefined ||
      price.price == undefined ||
      !publication_date ||
      storage_amount == undefined ||
      !isbn ||
      !image_urls
    ) return;

    let item: Item = {
      id: id || undefined,
      title,
      subtitle,
      description,
      page_count,
      cover_type,
      weight,
      price: {
        price: price.price,
        discount_price: price.discount_price as number
      },
      publication_date,
      storage_amount,
      isbn,
      image_urls: image_urls.split(',').map(url => url.trim())
    }

    console.log(item.description);

    if(id) {
      this.itemsFacade.editItem(item);
    } else {
      this.itemsFacade.createItem(item);
    }
  }

  deleteItem() {
    if (this.itemForm.value.id) {
      this.itemsFacade.deleteItem(this.itemForm.value.id);
      this.itemsFacade.itemDeleted$.subscribe((deleted) => {
        if (deleted) {
          this.router.navigate(['..'], { relativeTo: this.activatedRoute })
        }
      })
    }
  }
}
