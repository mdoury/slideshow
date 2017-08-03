import { Component, OnDestroy } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { AppActions } from '../actions';
import { IAppState } from '../store';

@Component({
  selector: 'slide-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  optionMenuIsOpen: boolean;
  optionMenuIsOpenSub;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions) {
      this.optionMenuIsOpenSub = ngRedux.select<boolean>('optionMenuIsOpen').subscribe(isOpen => this.optionMenuIsOpen = isOpen);
    }

  prevFrame() {
    this.ngRedux.dispatch(this.actions.decrement());
  }

  nextFrame() {
    this.ngRedux.dispatch(this.actions.increment());
  }

  toggleMenu() {
    this.ngRedux.dispatch(this.actions.toggleMenu());
    console.log(this.optionMenuIsOpen);
  }

  toggleFullscreen() {
    this.ngRedux.dispatch(this.actions.toggleFullscreen());
  }

  ngOnDestroy () {
    this.optionMenuIsOpenSub.unsubscribe();
  }

}
