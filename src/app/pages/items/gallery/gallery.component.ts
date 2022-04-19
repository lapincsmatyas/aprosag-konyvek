import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

// import Swiper core and required modules
import SwiperCore, {Pagination, Navigation, SwiperOptions, Autoplay} from 'swiper';
import Swiper from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

@Component({
  selector: 'aprosag-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  config: SwiperOptions = {
    navigation: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
  };

  sliderImages: string[] = [
    'Product_1/4.jpg',
    'Product_2/4.jpg',
    'Product_3/4.jpg',
    'Product_4/4.jpg',
  ];

  actImage: number = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  imageChanged([swiper]: Swiper[]) {
    this.actImage = swiper.activeIndex;
    this.changeDetectorRef.detectChanges();
  }
}
