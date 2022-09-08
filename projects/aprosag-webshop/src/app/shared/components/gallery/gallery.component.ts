import {ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import SwiperCore, {Autoplay, Navigation, Pagination, SwiperOptions} from 'swiper';
import {Router} from "@angular/router";
import Swiper from "swiper";
import {SwiperComponent} from "swiper/angular";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddedToCartComponent} from "../../popups/added-to-cart/added-to-cart.component";
import {FullscreenImageComponent} from "./fullscreen-image/fullscreen-image.component";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export interface SliderImage {
  src: string;
  url?: string;
  site?: string;
  fullscreen?: boolean;
}

@Component({
  selector: 'aprosag-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @Input() images: SliderImage[] | null = [];
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

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef, private readonly modalService: NgbModal) {
  }

  openUrl(sliderImage: SliderImage) {
    console.log(sliderImage);
    if(sliderImage.fullscreen){
      const modalRef = this.modalService.open(FullscreenImageComponent, {
        backdrop: true,
        backdropClass: 'modal-dialog-backdrop',
        modalDialogClass: 'modal-dialog-centered added-to-cart-dialog'
      });
      modalRef.componentInstance.imageSrc = sliderImage.src;
    } else if(sliderImage.site) {
      window.open(sliderImage.site);
      return;
    } else if(sliderImage.url) {
      this.router.navigateByUrl(sliderImage.url);
      return;
    }
  }

  slideChanged($event: [swiper: Swiper]) {
    this.activeIndex = $event[0].realIndex;
    this.changeDetectorRef.detectChanges();
  }

  smallImageClicked(i: number) {
    this.swiper?.swiperRef.slideTo(i);
  }
}
