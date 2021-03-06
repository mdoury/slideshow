import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';

import { NgRedux } from '@angular-redux/store';
import { AppActions } from './actions';
import { IAppState } from './store';
import { Subscription } from 'rxjs/Subscription';

import { ISlide, ICode } from './interfaces';

import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Injectable()
export class SlideshowService implements OnDestroy {

  highlightAll: (this: void) => void;
  activeSlideIndex: number;
  activeSlideIndexSub: Subscription;
  slides: ISlide[];
  slidesSub: Subscription;
  isCodeHighlighted: boolean;
  isCodeHighlightedSub: Subscription;

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
    this.isCodeHighlightedSub = ngRedux
      .select<boolean>('isCodeHighlighted')
      .subscribe(isHighlighted => this.isCodeHighlighted = isHighlighted);
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
    this.resetCode();
    this.ngRedux.dispatch(this.actions.nextSlide());
  }

  prevSlide() {
    this.resetCode();
    this.ngRedux.dispatch(this.actions.prevSlide());
  }

  goToSlide(idx: number) {
    this.resetCode();
    this.ngRedux.dispatch(this.actions.goToSlide(idx));
  }

  private handleCode(slide: ISlide) {
    if (slide.code) {
      // Array of strings: each string is a code line
      if (Array.isArray(slide.code.source)) {
        slide.code.source = '\n' + slide.code.source.join('\n');
      } else if (this.isString(slide.code.source)) {
      // String: path to source file
        this.http.get('./assets/' + slide.code.source)
          .map(res => res.text())
          .map(txt => slide.code.source = '\n' + txt)
          .subscribe()
      }
    }
  }

  highlightedCode() {
    this.ngRedux.dispatch(this.actions.highlightedCode());
  }

  resetCode() {
    this.ngRedux.dispatch(this.actions.resetCode());
  }

  private isString(x: any): x is string {
    return typeof x === 'string';
  }

  ngOnDestroy () {
    this.activeSlideIndexSub.unsubscribe();
    this.slidesSub.unsubscribe();
    this.isCodeHighlightedSub.unsubscribe();
  }

}
