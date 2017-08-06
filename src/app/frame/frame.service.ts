import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { NgRedux } from '@angular-redux/store';
import { AppActions } from './actions';
import { IAppState } from './store';
import { Subscription } from 'rxjs/Subscription';

import { IFrame, ICode } from './interfaces';

import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Injectable()
export class FrameService {

  highlightAll: (this: void) => void;
  activeFrameIndex: number;
  activeFrameIndexSub: Subscription;
  frames: IFrame[];
  framesSub: Subscription;

  constructor(
    private http: Http,
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions) {
      this.activeFrameIndexSub = ngRedux
      .select<number>('activeFrameIndex')
      .subscribe(idx => this.activeFrameIndex = idx);
    this.framesSub = ngRedux
      .select<IFrame[]>('frames')
      .subscribe(f => this.frames = f);
      this.highlightAll = Prism.highlightAll;
    }

  initFrames(filename: string) {
    this.http.get(filename) 
      .map(res => res.json()) 
      .map(data => {
        data.map(frame => this.handleCode(frame));
        this.ngRedux.dispatch(this.actions.loadFrames(data));
      })
      .subscribe();
  }

  nextFrame() {
    this.ngRedux.dispatch(this.actions.nextFrame());
  }

  prevFrame() {
    this.ngRedux.dispatch(this.actions.prevFrame());
  }

  goToFrame(idx?: number) {
    this.ngRedux.dispatch(this.actions.goToFrame(idx)); 
  }
  
  private handleCode(frame: IFrame) {
    if (frame.code) {
      // Array of strings: each string is a code line
      if (Array.isArray(frame.code.source)) {
        frame.code.source = '\n'+frame.code.source.join('\n');
      } 
      // String: path to source file
      else if (this.isString(frame.code.source)) {
        this.http.get('./assets/' + frame.code.source)
          .map(res => res.text())
          .map(txt => frame.code.source = '\n' + txt)
          .subscribe()
      }
    }
  }

  private isString(x: any): x is string {
    return typeof x === "string";
  }

}
