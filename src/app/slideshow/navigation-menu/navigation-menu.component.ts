import { Component } from '@angular/core';

import { SlideshowService } from '../slideshow.service';
import { NavigationMenuService } from './navigation-menu.service';

@Component({
  selector: 'slideshow-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {

  constructor(
    private slideshowService: SlideshowService,
    private navigationMenuService: NavigationMenuService) {}

}
