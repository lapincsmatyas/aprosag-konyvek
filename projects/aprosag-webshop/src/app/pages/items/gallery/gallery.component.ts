import {ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import SwiperCore, {Autoplay, Navigation, Pagination, SwiperOptions} from 'swiper';
import {Router} from "@angular/router";
import Swiper from "swiper";
import {SwiperComponent} from "swiper/angular";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export interface SliderImage {
  src: string;
  url?: string;
  site?: string;
}

@Component({
  selector: 'aprosag-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @Input() images: SliderImage[] = [];
  @Input() showSmallImages = false;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  activeIndex = 0;

  config: SwiperOptions = {
    navigation: true,
    spaceBetween: 30,
    pagination: {clickable: true},
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true
    },
  };

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) {
  }

  openUrl(sliderImage: SliderImage) {
    if(sliderImage.site) {
      window.open(sliderImage.site);
      return;
    } else if(sliderImage.url) {
      this.router.navigateByUrl(sliderImage.url);
      return;
    }
  }

  slideChanged($event: [swiper: Swiper]) {
    this.activeIndex = $event[0].realIndex;
    console.log(this.activeIndex);
    this.changeDetectorRef.detectChanges();
  }

  smallImageClicked(i: number) {
    this.swiper?.swiperRef.slideTo(i);
  }
}
