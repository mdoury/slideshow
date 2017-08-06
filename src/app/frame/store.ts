import { AppActions } from './actions';
import { IFrame, IAction } from './interfaces'

export interface IAppState {
  isFullscreen: boolean;
  activeFrameIndex: number;
  frames: IFrame[];
  isOptionMenuOpen: boolean;
}

export const INITIAL_STATE: IAppState = {
  isFullscreen: false,
  activeFrameIndex: 0,
  frames: [],
  isOptionMenuOpen: false
};

export function rootReducer(lastState: IAppState, action: IAction): IAppState {
  switch (action.type) {
    case AppActions.LOAD_FRAMES:
      if (action.payload) {
        return Object.assign({}, lastState, {
          frames: action.payload
        });
      } else {
        return lastState;
      }
    case AppActions.NEXT_FRAME:
      // Do nothing if activeFrameIndex exceeds the number of frames
      if (lastState.activeFrameIndex + 1 >= lastState.frames.length) { return lastState; }
      return Object.assign({}, lastState, {
        activeFrameIndex: lastState.activeFrameIndex + 1
      });
    case AppActions.PREV_FRAME:
      // Do nothing if activeFrameIndex is negative
      if (lastState.activeFrameIndex <= 0) { return lastState; }
      return Object.assign({}, lastState, {
        activeFrameIndex: lastState.activeFrameIndex - 1
      });
    case AppActions.GO_TO_FRAME:
      // Do nothing if activeFrameIndex outside the accepted range
      if ("payload" in action) {
        return Object.assign({}, lastState, {
          activeFrameIndex: action.payload
        });
      } else {
        return lastState;
      }
    case AppActions.TOGGLE_FULLSCREEN:
      const el = document.getElementById('slideshowFrame');
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
  }

  // We don't care about any other actions right now.
  return lastState;
}
