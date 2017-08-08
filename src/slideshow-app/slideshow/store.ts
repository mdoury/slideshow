import { AppActions } from './actions';
import { ISlide, IAction } from './interfaces'

export interface IAppState {
  isCodeHighlighted: boolean;
  isFullscreen: boolean;
  activeSlideIndex: number;
  slides: ISlide[];
  isOptionMenuOpen: boolean;
}

export const INITIAL_STATE: IAppState = {
  isCodeHighlighted: false,
  isFullscreen: false,
  activeSlideIndex: 0,
  slides: [],
  isOptionMenuOpen: false
};

export function rootReducer(lastState: IAppState, action: IAction): IAppState {
  switch (action.type) {
    case AppActions.LOAD_SLIDES:
      if (action.payload) {
        return Object.assign({}, lastState, {
          slides: action.payload
        });
      } else {
        return lastState;
      }
    case AppActions.NEXT_SLIDE:
      // Do nothing if activeSlideIndex exceeds the number of slides
      if (lastState.activeSlideIndex + 1 >= lastState.slides.length) { return lastState; }
      return Object.assign({}, lastState, {
        activeSlideIndex: lastState.activeSlideIndex + 1
      });
    case AppActions.PREV_SLIDE:
      // Do nothing if activeSlideIndex is negative
      if (lastState.activeSlideIndex <= 0) { return lastState; }
      return Object.assign({}, lastState, {
        activeSlideIndex: lastState.activeSlideIndex - 1
      });
    case AppActions.GO_TO_SLIDE:
      // Do nothing if activeSlideIndex outside the accepted range
      if ('payload' in action) {
        return Object.assign({}, lastState, {
          activeSlideIndex: action.payload
        });
      } else {
        return lastState;
      }
    case AppActions.TOGGLE_FULLSCREEN:
      const el = document.getElementById('slideshow-shell');
      if (lastState.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document['mozCancelFullScreen']) {
          document['mozCancelFullScreen']();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      } else {
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el['mozRequestFullScreen']) {
          el['mozRequestFullScreen']();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el['msRequestFullscreen']) {
          el['msRequestFullscreen']();
        }
      }
      return Object.assign({}, lastState, {
        isFullscreen: !lastState.isFullscreen,
      });
    case AppActions.TOGGLE_MENU:
      return Object.assign({}, lastState, {
        isOptionMenuOpen: !lastState.isOptionMenuOpen
      });
    case AppActions.HIGHLIGHTED_CODE:
      return Object.assign({}, lastState, {
        isCodeHighlighted: true
      });
    case AppActions.RESET_CODE:
      return Object.assign({}, lastState, {
        isCodeHighlighted: false
      });
  }
  return lastState;
}
