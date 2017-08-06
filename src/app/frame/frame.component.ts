import { Component, OnInit, AfterViewChecked, Input, HostListener } from '@angular/core';

import { FrameService } from './frame.service';
import { NavigationMenuService } from './navigation-menu/navigation-menu.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  G = 71
}

@Component({
  selector: 'slideshow-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
  providers: [ FrameService, NavigationMenuService ]
})
export class FrameComponent implements OnInit, AfterViewChecked {

  @Input() filename: string;

  constructor(
    private frameService: FrameService,
    private navigationMenuService: NavigationMenuService
  ){ }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODE.RIGHT_ARROW:
        this.frameService.nextFrame();
        break;
      case KEY_CODE.LEFT_ARROW:
        this.frameService.prevFrame();
        break;
      case KEY_CODE.G:
        this.frameService.goToFrame();
        break;
      default:
    }
  }

  ngOnInit() {
    this.frameService.initFrames(this.filename);
  }

  ngAfterViewChecked() {
    this.frameService.highlightAll();
  }
}
