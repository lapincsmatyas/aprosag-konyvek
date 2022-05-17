import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

// import Swiper core and required modules
import SwiperCore, {Pagination, Navigation, SwiperOptions, Autoplay} from 'swiper';
import Swiper from "swiper";
import {Router} from "@angular/router";

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
    pagination: {clickable: true},
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true
    },
  };

  sliderImages: { image: string, url?: string, site?: string }[] = [
    {image: 'Slider/Slider_1.jpg', url: '/items/JTr5jLNLKU4n14BWyjtG'},
    {image: 'Slider/Slider_2.jpg', url: '/items/6D55n8mtvHT2EKDzQTkn'},
    {image: 'Slider/Slider_3.jpg', site: 'https://www.udvarbongeszo.aprosagkonyvek.hu/'},
    {image: 'Slider/Slider_4.jpg', site: 'https://www.udvarbongeszo.aprosagkonyvek.hu/'}
  ];

  constructor(private router: Router) {
  }

  openUrl(sliderImage: { image: string, url?: string, site?: string }) {
    if(sliderImage.site) {
      window.open(sliderImage.site);
      return;
    } else if(sliderImage.url) {
      this.router.navigateByUrl(sliderImage.url);
      return;
    }
  }
}
