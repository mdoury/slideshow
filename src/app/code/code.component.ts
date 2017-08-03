import { Component, AfterViewInit, Input} from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { CounterActions } from '../actions'; 
import { IAppState } from "../store"; 

import Prism from 'prismjs';

import { Code } from "../code";

@Component({
  selector: 'slide-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements AfterViewInit {

  @Input() code: Code;
  frameIndex: number;
  subFrameIndex;

  constructor(
    private ngRedux: NgRedux<IAppState>, 
    private actions: CounterActions) {
    this.subFrameIndex = ngRedux.select<number>('frameIndex')
        .subscribe(idx => this.frameIndex = idx);
  }

  ngAfterViewInit () {
    const codeNode = document.getElementsByTagName('code')[0];
    console.log(codeNode)
    Prism.highlightElement(codeNode);
  }
}