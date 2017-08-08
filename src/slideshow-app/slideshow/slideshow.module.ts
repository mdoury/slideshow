import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';
import { MdButtonModule, MdSliderModule } from '@angular/material';
import 'hammerjs';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { rootReducer, IAppState, INITIAL_STATE } from './store';
import { AppActions } from './actions';

import { SlideshowComponent } from './slideshow.component';
import { SlideshowService } from './slideshow.service';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NavigationMenuService } from './navigation-menu/navigation-menu.service';
import { OptionMenuComponent } from './option-menu/option-menu.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MdButtonModule,
    MdSliderModule,
    NgReduxModule
  ],
  declarations: [
    SlideshowComponent,
    NavigationMenuComponent,
    OptionMenuComponent,
    SliderComponent
  ],
  providers: [
    AppActions,
    SlideshowService,
    NavigationMenuService
  ],
  exports: [ SlideshowComponent ]
})
export class SlideshowModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);
  }
 }
