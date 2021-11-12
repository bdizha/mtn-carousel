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
      }
    ]
  }
}
