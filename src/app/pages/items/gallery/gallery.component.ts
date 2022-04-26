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
    spaceBetween: 30,
    pagination: { clickable: true },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
  };

  sliderImages: string[] = [
    'Slider/Slider_1.jpg',
    'Slider/Slider_2.jpg',
    'Slider/Slider_3.jpg',
    'Slider/Slider_4.jpg',
  ];

  constructor() { }
}
