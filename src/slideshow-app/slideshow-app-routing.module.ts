import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';

const routes: Routes = [
  { path: 'slide/:id?', component: SlideshowComponent },
  { path: '', children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SlideshowAppRoutingModule { }
