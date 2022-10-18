import { Component, OnInit } from '@angular/core';
import { ItemsFacade, Item } from 'items';
import { FormControl, NonNullableFormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  itemForm = this.formBuilder.group({
      id: new FormControl<string | undefined>(undefined),
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      page_count: [0, Validators.required],
      cover_type: ['', Validators.required],
      weight: [0, Validators.required],
      price: this.formBuilder.group({
        price: [0, Validators.required],
        discount_price: undefined
      }),
      publication_date: [new Date(), Validators.required],
      storage_amount: [0, Validators.required],
      isbn: ['', Validators.required],
      image_urls: this.formBuilder.array<string>([])
    }
  )

  get imageUrls() {
    return this.itemForm.get('image_urls') as FormArray;
  }

  constructor(public itemsFacade: ItemsFacade,
              private formBuilder: NonNullableFormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.itemsFacade.getItemById$(this.activatedRoute.snapshot.params['id']).subscribe(item => {
        if (item) {
          this.itemForm.patchValue(item);
          this.imageUrls.clear();
          item.image_urls.forEach(image => {
            this.addImage(image)
          })
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
      image_urls
    }

    if(id == undefined) {
      this.itemsFacade.createItem(item);
      this.itemsFacade.itemCreated$.subscribe((deleted) => {
        if (deleted) {
          this.router.navigate(['..'], { relativeTo: this.activatedRoute })
        }
      })


    } else {
      this.itemsFacade.editItem({
        id,
        ...item
      });
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

  addImage(url?: string) {
    const imageForm = this.formBuilder.control(url || '', Validators.required);
    this.imageUrls.push(imageForm);
  }

  removeImage(i: number) {
    this.imageUrls.removeAt(i);
  }
}
