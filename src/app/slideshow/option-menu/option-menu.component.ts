import { Component, OnInit } from '@angular/core';
import { NavigationMenuService } from '../navigation-menu/navigation-menu.service';

@Component({
  selector: 'slideshow-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.css']
})
export class OptionMenuComponent implements OnInit {

  constructor(private navigationMenuService: NavigationMenuService) { }

  ngOnInit() {
  }

}
