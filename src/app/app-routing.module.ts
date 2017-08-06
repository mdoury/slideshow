import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameComponent } from './frame/frame.component';

const routes: Routes = [
  { path: 'slide/:id', component: FrameComponent },
  { path: '', children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
