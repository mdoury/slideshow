import { Component } from '@angular/core';

import { SlideshowService } from '../slideshow.service';
import { NavigationMenuService } from '../navigation-menu/navigation-menu.service';

@Component({
  selector: 'slideshow-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  constructor(
    private slideshowService: SlideshowService,
    private navigationMenuService: NavigationMenuService) {}

}
