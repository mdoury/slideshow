import { Injectable } from '@angular/core';
import { IAction } from './interfaces';

@Injectable()
export class AppActions {
  static NEXT_SLIDE = 'NEXT_SLIDE';
  static PREV_SLIDE = 'PREV_SLIDE';
  static GO_TO_SLIDE = 'GO_TO_SLIDE';
  static TOGGLE_MENU = 'TOGGLE_MENU';
  static TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';
  static LOAD_SLIDES = 'LOAD_SLIDES';

  loadSlides(data): IAction {
    return { type: AppActions.LOAD_SLIDES, payload: data };
  }

  nextSlide(): IAction {
    return { type: AppActions.NEXT_SLIDE };
  }

  prevSlide(): IAction {
    return { type: AppActions.PREV_SLIDE };
  }

  goToSlide(slideIndex:number): IAction {
    return { type: AppActions.GO_TO_SLIDE, payload: slideIndex };
  }

  toggleMenu(): IAction {
    return { type: AppActions.TOGGLE_MENU};
  }

  toggleFullscreen(): IAction {
    return { type: AppActions.TOGGLE_FULLSCREEN};
  }
}
