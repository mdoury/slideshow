import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgRedux } from '@angular-redux/store';
import { CounterActions } from './actions';
import { IAppState } from './store';

// import Prism from 'prismjs';

import { Frame } from './frame';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'slide-root',
  template: `
    <slide-frame
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
  };
  .menu {
    display: fixed;
    bottom: 30px;
    right: 30px;
  }`]
})
export class AppComponent {

  // frameIndex$: Observable<number>;
  frameIndex: number;
  frameIndexSub;
  frames$: Observable<Frame[]>;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private actions: CounterActions) {
    // this.frameIndex$ = ngRedux.select<number>('frameIndex');
    this.frameIndexSub = ngRedux.select<number>('frameIndex').subscribe(fI => this.frameIndex = fI);
    this.frames$ = ngRedux.select<Frame[]>('frames');
  }

  nextFrame() {
    const fI = this.frameIndex;
    this.ngRedux.dispatch(this.actions.increment());
    console.log('increment frame', fI, this.frameIndex);
  }

  prevFrame() {
    const fI = this.frameIndex;
    this.ngRedux.dispatch(this.actions.decrement());
    console.log('decrement frame', fI, this.frameIndex);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.nextFrame();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.prevFrame();
    }
  }
}
