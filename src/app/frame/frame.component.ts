import { Component, AfterViewChecked, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import { NgRedux } from '@angular-redux/store';
import { AppActions } from '../actions';
import { IAppState } from '../store';

import Prism from 'prismjs';

import { Frame } from '../frame';

@Component({
  selector: 'slide-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements AfterViewChecked {

  @Input() frameIdx: number;

  frameIndex: number;
  frameIndexSub;
  frames$: Observable<Frame[]>;
  optionMenuIsOpen$: Observable<boolean>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions) {
    this.frameIndexSub = ngRedux.select<number>('frameIndex').subscribe(fI => this.frameIndex = fI);
    this.frames$ = ngRedux.select<Frame[]>('frames');
  }

  ngAfterViewChecked() {
    Prism.highlightAll();
  }

}
