import { Component, AfterViewInit } from '@angular/core';

import { SlideshowService } from '../slideshow.service';
import { NavigationMenuService } from '../navigation-menu/navigation-menu.service';

@Component({
  selector: 'slideshow-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit {
  constructor(
    public slideshowService: SlideshowService,
    public navigationMenuService: NavigationMenuService) {}

  ngAfterViewInit() {
    document.getElementById("slide-slider").focus();
  }
}
