import {Component, Input, OnInit} from '@angular/core';
import {Draggable, Linear, TimelineMax, TweenLite} from "gsap/all";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() items: Array<any> = [];
  @Input() scrollItems: Number = 6;

  private baseTl: any = {};
  private animation: any = {};
  private cellWidth: Number = 0;
  private wrapWidth: Number = 0;
  private cellStep: Number = 0;
  private x: number | undefined;

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

    if (clientWidth > 768 && clientWidth < 969) {
      this.scrollItems = 3
    } else if (clientWidth < 768) {
      this.scrollItems = 1
    }

    const numCells = cells.length;
    this.cellStep = 1 / numCells;

    // @ts-ignore
    this.cellWidth = clientWidth / this.scrollItems;
    console.log(this.cellWidth, "this.cellWidth");

    this.wrapWidth = Number(this.cellWidth) * numCells;

    TweenLite.set(picker, {
      //perspective: 1100,
      width: Number(this.wrapWidth) - Number(this.cellWidth)
    });

    this.baseTl = new TimelineMax({paused: true});

    for (i = 0; i < cells.length; i++) {
      this.initCell(cells[i], i);
    }

    let animation = new TimelineMax({repeat: -1, paused: true})
      .add(this.baseTl.tweenFromTo(1, 2));

    console.log(proxy, 'proxy');

    const updateProgress = (event: any) => {
      console.log(event, 'prssssoxy');

      animation.progress(event.x / Number(this.wrapWidth));
    }

    new Draggable(proxy, {
      // allowContextMenu: true,
      type: "x",
      trigger: picker,
      throwProps: false,
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: {
        x: this.snapX
      },
      onThrowComplete: function () {
        console.log("onThrowComplete");
        //TODO: animation that inject selected card title
      }
    });

    console.log('after draggable...');
  }

  snapX(x: number) {
    return Math.round(x / Number(this.cellWidth)) * Number(this.cellWidth);
  }

  initCell(element: Element, index: number) {
    console.log('initCell', element);

    TweenLite.set(element, {
      width: this.cellWidth,
      scale: 0.6,
      //rotationX: rotationX,
      x: -this.cellWidth
    });

    const tl = new TimelineMax({repeat: 1})
      .to(element, 1, {x: "+=" + this.wrapWidth/*, rotationX: -rotationX*/}, 0)
      .to(element, this.cellStep, {
        className: "+=cell__active",
        scale: 1,
        repeat: 1,
        yoyo: true
      }, 0.5 - Number(this.cellStep));

    console.log(element);

    this.baseTl.add(tl, index * -this.cellStep);
  }

  onNext(): void {
    console.log(this.baseTl, "this.baseTl")
    // this.baseTl.play();
    // this.baseTl.pause();
  }

  onPrev(): void {
    console.log('onPrev...')
    // this.baseTl.play("scene" + last);
  }

}
