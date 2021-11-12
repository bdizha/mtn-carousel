import {Component, Input, OnInit} from '@angular/core';
import {Draggable, Linear, TimelineMax, TweenLite} from "gsap/all";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  // @Input() items: Array<any> = [];
  @Input() scrollItems: Number = 6;

  private baseTl: any = {};
  public items: Array<any> = [];
  private cellWidth: Number = 0;
  private wrapWidth: Number = 0;
  private cellStep: Number = 0;
  private x: number | undefined;

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

  ngOnInit(): void {
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
    let i: number;
    TweenLite.defaultEase = Linear.easeNone;

    const picker = document.querySelector(".picker");
    const cells = document.querySelectorAll(".cell");
    const proxy = document.createElement("div");

    const numCells = cells.length;
    this.cellStep = 1 / numCells;

    // @ts-ignore
    this.cellWidth = 450;

    console.log("items", this.items)

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

    const updateProgress = (event: any) => {
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
      }
    });
  }

  snapX(x: number) {
    return Math.round(x / Number(this.cellWidth)) * Number(this.cellWidth);
  }

  initCell(element: Element, index: number) {
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
  }

}
