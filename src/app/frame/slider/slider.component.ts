import { Component } from '@angular/core';

import { FrameService } from '../frame.service';
import { NavigationMenuService } from '../navigation-menu/navigation-menu.service';

@Component({
  selector: 'frame-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  constructor(
    private frameService: FrameService,
    private navigationMenuService: NavigationMenuService) {}

}
