import {Component, Input, OnInit} from '@angular/core';
import {Draggable, Linear, TimelineMax, TweenLite} from "gsap/all";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
          speed: 100
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
          speed: 100
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
          speed: 100
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
          speed: 100
        }
      }
    ]
  };
  items = [
    {
      image: 'assets/images/placeholder.svg',
      title: 'Mobile internet'
    },
    {
      image: 'assets/images/placeholder.svg',
      title: 'Home internet'
    },
    {
      image: 'assets/images/placeholder.svg',
      title: 'Get a Device'
    },
    {
      image: 'assets/images/placeholder.svg',
      title: 'Add a phone line  '
    },
    {
      image: 'assets/images/placeholder.svg',
      title: 'Upgrade'
    },
    {
      image: 'assets/images/placeholder.svg',
      title: 'Add a phone line  '
    },
    {
      image: 'assets/images/placeholder.svg',
      title: 'Upgrade'
    },
    {
      image: 'assets/images/placeholder.svg',
      title: 'Add a phone line  '
    },
    {
      image: 'assets/images/placeholder.svg',
      title: 'Upgrade'
    }
  ]

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor() { }

  ngOnInit(): void { }

}
