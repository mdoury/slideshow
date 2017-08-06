import { Injectable, OnDestroy } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { AppActions } from '../actions';
import { IAppState } from '../store';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class NavigationMenuService implements OnDestroy {

  isOptionMenuOpen: boolean;
  isOptionMenuOpenSub: Subscription;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions
  ) { 
    this.isOptionMenuOpenSub = ngRedux
      .select<boolean>('isOptionMenuOpen')
      .subscribe(isOpen => this.isOptionMenuOpen = isOpen);
    }

  toggleMenu() {
    this.ngRedux.dispatch(this.actions.toggleMenu());
  }

  toggleFullscreen() {
    if (this.isOptionMenuOpen) {
      this.toggleMenu();
    }
    this.ngRedux.dispatch(this.actions.toggleFullscreen());
  }

  onBackgroundClick() {
    if (this.isOptionMenuOpen) {
      this.ngRedux.dispatch(this.actions.toggleMenu());
    }
  }

  ngOnDestroy () {
    this.isOptionMenuOpenSub.unsubscribe();
  }

}
