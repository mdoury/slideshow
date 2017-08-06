import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { NgRedux } from '@angular-redux/store';
import { AppActions } from './actions';
import { IAppState } from './store';
import { Subscription } from 'rxjs/Subscription';

import { ISlide, ICode } from './interfaces';

import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Injectable()
export class SlideshowService {

  highlightAll: (this: void) => void;
  activeSlideIndex: number;
  activeSlideIndexSub: Subscription;
  slides: ISlide[];
  slidesSub: Subscription;

  constructor(
    private http: Http,
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions) {
      this.activeSlideIndexSub = ngRedux
      .select<number>('activeSlideIndex')
      .subscribe(idx => this.activeSlideIndex = idx);
    this.slidesSub = ngRedux
      .select<ISlide[]>('slides')
      .subscribe(f => this.slides = f);
      this.highlightAll = Prism.highlightAll;
    }

  initSlides(filename: string) {
    this.http.get(filename) 
      .map(res => res.json()) 
      .map(data => {
        data.map(slide => this.handleCode(slide));
        this.ngRedux.dispatch(this.actions.loadSlides(data));
      })
      .subscribe();
  }

  nextSlide() {
    this.ngRedux.dispatch(this.actions.nextSlide());
  }

  prevSlide() {
    this.ngRedux.dispatch(this.actions.prevSlide());
  }

  goToSlide(idx?: number) {
    this.ngRedux.dispatch(this.actions.goToSlide(idx)); 
  }
  
  private handleCode(slide: ISlide) {
    if (slide.code) {
      // Array of strings: each string is a code line
      if (Array.isArray(slide.code.source)) {
        slide.code.source = '\n'+slide.code.source.join('\n');
      } 
      // String: path to source file
      else if (this.isString(slide.code.source)) {
        this.http.get('./assets/' + slide.code.source)
          .map(res => res.text())
          .map(txt => slide.code.source = '\n' + txt)
          .subscribe()
      }
    }
  }

  private isString(x: any): x is string {
    return typeof x === "string";
  }

}
