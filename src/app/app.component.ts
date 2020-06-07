import { Component, HostListener, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items = [];
  timeout = 500;
  mySwiper: any;
  slides = 3;
  invalid = false;
  label = 'Slide';
  maxlength = false;
  charLimit = 20;
  showBox = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.swiperInit();
  }

  constructor() { }

  ngOnInit() {
    this.updateItems();
  }

  updateItems() {
    if (!this.slides || typeof this.slides !== 'number' || this.slides < 0) {
      this.invalid = true;
      return;
    }
    this.invalid = false;
    this.items = [];
    for (let i = 1; i <= this.slides; i++) {
      this.items.push(i);
    }
    this.swiperInit();
  }

  checkLength() {
    if (this.label.length > this.charLimit) {
      this.maxlength = true;
      this.label = this.label.slice(0, this.charLimit);
    } else {
      this.maxlength = false;
    }
  }

  swiperInit() {
    const SwiperContainer = document.querySelector('.swiper-container');
    SwiperContainer.classList.add('loading');
    setTimeout(() => {
      const itemWidth = document.querySelector('.item').clientWidth;
      const itemsTotalWidth = itemWidth * this.items.length;
      const containerWidth = SwiperContainer.clientWidth;
      let slidesPerView = containerWidth / itemWidth;

      if (slidesPerView - Math.floor(slidesPerView) > .65) {
        slidesPerView = Math.floor(slidesPerView) + .65;
      }
      if (slidesPerView - Math.floor(slidesPerView) < .4) {
        slidesPerView = Math.floor(slidesPerView) + .4;
      }

      if (itemsTotalWidth > containerWidth) {
        SwiperContainer.classList.remove('no-swiper');
        if (this.mySwiper) {
          this.mySwiper.destroy();
          this.mySwiper = null;
        }
        this.mySwiper = new Swiper('.swiper-container', {
          slidesPerView: slidesPerView,
          grabCursor: true
        });
        SwiperContainer.classList.remove('loading');
      } else {
        SwiperContainer.classList.remove('loading');
        SwiperContainer.classList.add('no-swiper');
        if (this.mySwiper) {
          this.mySwiper.destroy();
        }
      }
    }, this.timeout);
  }
}
