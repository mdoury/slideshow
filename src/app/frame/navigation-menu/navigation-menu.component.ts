import { Component } from '@angular/core';

import { FrameService } from '../frame.service';
import { NavigationMenuService } from './navigation-menu.service';

@Component({
  selector: 'frame-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {

  constructor(
    private frameService: FrameService,
    private navigationMenuService: NavigationMenuService) {}

}
