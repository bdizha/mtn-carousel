import { Component } from '@angular/core';
import "@fontsource/work-sans"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mtn-carousel';

  public items: Array<any> = [];
  public slideConfig: any = {};

  constructor() {
    this.items = [
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
        title: 'Get a Device'
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

    this.slideConfig = {
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
  }
}
