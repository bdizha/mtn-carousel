import {Component, OnInit} from '@angular/core';
import {Draggable, Linear, TimelineMax, TweenLite} from "gsap/all";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  private x: number | undefined;
  private isMobile: Boolean | undefined;
  private scrollItems: number | undefined;

  constructor() {
  }

  ngOnInit(): void {
    let i: number;
    TweenLite.defaultEase = Linear.easeNone;

    const picker = document.querySelector(".picker");
    const cells = document.querySelectorAll(".cell");
    const proxy = document.createElement("div");

    // @ts-ignore
    console.log(picker.clientWidth, "clientWidth");

    // @ts-ignore
    const clientWidth = picker.clientWidth;

    this.isMobile = false
    if (clientWidth >= 992) {
      this.scrollItems = 6
    } else if (clientWidth > 768) {
      this.scrollItems = 3
    } else {
      this.scrollItems = 1
      this.isMobile = true
    }

    const numCells = cells.length;
    const cellStep = 1 / numCells;

    const cellWidth = clientWidth / this.scrollItems;
    console.log(cellWidth, "cellWidth");
    const wrapWidth = cellWidth * numCells;

    console.log(cellStep, "body");

    TweenLite.set(picker, {
      //perspective: 1100,
      width: wrapWidth - cellWidth
    });

    const baseTl = new TimelineMax({paused: true});

    for (i = 0; i < cells.length; i++) {
      initCell(cells[i], i);
    }

    let animation = new TimelineMax({repeat: -1, paused: true})
      .add(baseTl.tweenFromTo(1, 2));

    const updateProgress = (event: any) => {
      animation.progress(event.x / wrapWidth);
    }

    console.log(proxy);

    const draggable = new Draggable(proxy, {
      // allowContextMenu: true,
      type: "x",
      trigger: picker,
      throwProps: false,
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: {
        x: snapX
      },
      onThrowComplete: function () {
        console.log("onThrowComplete");
        //TODO: animation that inject selected card title
      }
    });

    console.log('after draggable...');

    function snapX(x: number) {
      return Math.round(x / cellWidth) * cellWidth;
    }

    function initCell(element: Element, index: number) {
      console.log('initCell', element);

      TweenLite.set(element, {
        width: cellWidth,
        scale: 0.6,
        //rotationX: rotationX,
        x: -cellWidth
      });

      const tl = new TimelineMax({repeat: 1})
        .to(element, 1, {x: "+=" + wrapWidth/*, rotationX: -rotationX*/}, 0)
        .to(element, cellStep, {className: "+=cell__active", scale: 1, repeat: 1, yoyo: true}, 0.5 - cellStep);

      console.log(element);

      baseTl.add(tl, i * -cellStep);
    }
  }

  onPlay(): void {
    console.log('testing...')
  }

}
