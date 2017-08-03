import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { CounterActions } from '../actions';
import { IAppState } from '../store';

@Component({
  selector: 'slide-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: CounterActions) { }

  prevFrame() {
    this.ngRedux.dispatch(this.actions.decrement());
  }

  nextFrame() {
    this.ngRedux.dispatch(this.actions.increment());
  }

}
