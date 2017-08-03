import { Action } from 'redux';
import { AppActions } from './actions';
import { Frame } from './frame';

export interface IAppState {
  isFullscreen: boolean;
  optionMenuIsOpen: boolean;
  frameIndex: number;
  frames: Frame[];
}

export const INITIAL_STATE: IAppState = {
  isFullscreen: false,
  optionMenuIsOpen: false,
  frameIndex: 0,
  frames: [{
      title: 'First frame',
      content: 'You are seeing the first.frame();',
      type: 'basic',
      style: {
        color: 'white',
        bgColor: '#2ecc71'
      }
    }, {
      title: 'Second frame',
      content: 'You are seeing the second.frame();',
      type: 'code',
      style: {
        color: 'white',
        bgColor: '#2980b9'
      },
      code: {
        label: 'ex1',
        source: 'const test = require("testing");',
        language: 'javascript'
      }
  }, {
      title: 'Third frame',
      content: 'You are seeing the third.frame();',
      type: 'code',
      style: {
        color: 'white',
        bgColor: '#f39c12'
      },
      code: {
        label: 'ex2',
        source: '<img src="example2.png">',
        language: 'markup'
      }
    }, {
      title: 'Fourth frame',
      content: 'You are seeing the fourth.frame();',
      type: 'code',
      style: {
        color: 'white',
        bgColor: '#c0392b'
      },
      code: {
        label: 'ex3',
        source: '<img src="example3.png">',
        language: 'markup'
      }
    }]
};

export function rootReducer(lastState: IAppState, action: Action): IAppState {
  switch (action.type) {
    case AppActions.INCREMENT_FRAME_INDEX:
      // Do nothing if frameIndex exceeds the number of frames
      if (lastState.frameIndex + 1 >= lastState.frames.length) { return lastState; }
      return Object.assign({}, lastState, {
        frameIndex: lastState.frameIndex + 1
      });
    case AppActions.DECREMENT_FRAME_INDEX:
      // Do nothing if frameIndex is negative
      if (lastState.frameIndex <= 0) { return lastState; }
      return Object.assign({}, lastState, {
        frameIndex: lastState.frameIndex - 1
      });
    case AppActions.TOGGLE_MENU:
      return Object.assign({}, lastState, {
          optionMenuIsOpen: !lastState.optionMenuIsOpen
      });
    case AppActions.TOGGLE_FULLSCREEN:
      const el = document.getElementById('slideFrame');
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
        isFullscreen: !lastState.isFullscreen
      });
  }

  // We don't care about any other actions right now.
  return lastState;
}
