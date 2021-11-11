import {Component, OnInit} from '@angular/core';
import {Draggable, TimelineMax, TweenLite, Linear} from "gsap/all";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  private x: number | undefined;

  constructor() {
  }

  ngOnInit(): void {
    let i: number;
    TweenLite.defaultEase = Linear.easeNone;

    const picker = document.querySelector(".picker");
    const cells = document.querySelectorAll(".cell");
    const proxy = document.createElement("div");

    const cellWidth = 450;

    const numCells = cells.length;
    const cellStep = 1 / numCells;
    const wrapWidth = cellWidth * numCells;

    console.log(cellStep, "cellStep");

    const baseTl = new TimelineMax({paused: true});

    TweenLite.set(picker, {
      //perspective: 1100,
      width: wrapWidth - cellWidth
    });

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
        scale: 0.75,
        //rotationX: rotationX,
        x: -cellWidth
      });

      const tl = new TimelineMax({repeat: 1})
        .to(element, 1, {x: "+=" + wrapWidth/*, rotationX: -rotationX*/}, 0)
        .to(element, cellStep, {color: "#009688", scale: 1, repeat: 1, yoyo: true}, 0.5 - cellStep);

      baseTl.add(tl, i * -cellStep);
    }
  }

}
