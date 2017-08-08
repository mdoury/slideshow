import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SlideshowAppComponent } from './slideshow-app.component';
import { SlideshowModule } from './slideshow/slideshow.module';

@NgModule({
  declarations: [
    SlideshowAppComponent
  ],
  imports: [
    BrowserModule,
    SlideshowModule
  ],
  providers: [],
  bootstrap: [SlideshowAppComponent]
})
export class SlideshowAppModule {}
