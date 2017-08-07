import { Component, OnInit, AfterViewChecked, Input, HostListener } from '@angular/core';

import { SlideshowService } from './slideshow.service';
import { NavigationMenuService } from './navigation-menu/navigation-menu.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  providers: [ SlideshowService, NavigationMenuService ]
})
export class SlideshowComponent implements OnInit, AfterViewChecked {

  @Input() filename: string;

  constructor(
    public slideshowService: SlideshowService,
    public navigationMenuService: NavigationMenuService
  ){ }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODE.RIGHT_ARROW:
        this.slideshowService.nextSlide();
        break;
      case KEY_CODE.LEFT_ARROW:
        this.slideshowService.prevSlide();
        break;
      default:
    }
  }

  ngOnInit() {
    this.slideshowService.initSlides(this.filename);
  }

  ngAfterViewChecked() {
    if (this.slideshowService.isCodeHighlighted) { return; }
    this.slideshowService.highlightAll();
    this.slideshowService.highlightedCode();
  }
}
