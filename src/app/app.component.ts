import { Component, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgRedux } from '@angular-redux/store';
import { AppActions } from './actions';
import { IAppState } from './store';

import { Frame } from './frame';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'slide-root',
  template: `
  <slide-frame
    id="slideFrame"
    [frameIdx] = "frameIndex">
  </slide-frame>
  <router-outlet></router-outlet>
  `,
  styles: [`
  :host { 
    display: flex; 
    justify-content: center; 
    align-items: center;
    min-height: 100vh;
    margin: 0;
  }
  `]
})
export class AppComponent {

  frameIndex: number;
  frameIndexSub;
  frames$: Observable<Frame[]>;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions) {
    this.frameIndexSub = ngRedux.select<number>('frameIndex').subscribe(fI => this.frameIndex = fI);
    this.frames$ = ngRedux.select<Frame[]>('frames');
  }

  nextFrame() {
    this.ngRedux.dispatch(this.actions.increment());
  }

  prevFrame() {
    this.ngRedux.dispatch(this.actions.decrement());
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODE.RIGHT_ARROW:
          this.nextFrame();
          break;
      case KEY_CODE.LEFT_ARROW:
          this.prevFrame();
          break;
      default:
    }
  }
}
