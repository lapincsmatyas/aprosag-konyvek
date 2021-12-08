import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'aprosag-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement('click', () => {
      this.close();
    });
  }

  close(){
    this.el.nativeElement.classList.remove('sshow');
    this.el.nativeElement.classList.add('hhidden');
  }
}
