import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class AppActions {
  static INCREMENT_FRAME_INDEX = 'INCREMENT_FRAME_INDEX';
  static DECREMENT_FRAME_INDEX = 'DECREMENT_FRAME_INDEX';
  static TOGGLE_MENU = 'TOGGLE_MENU';
  static TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';

  increment(): Action {
    return { type: AppActions.INCREMENT_FRAME_INDEX };
  }

  decrement(): Action {
    return { type: AppActions.DECREMENT_FRAME_INDEX };
  }

  toggleMenu(): Action {
    return { type: AppActions.TOGGLE_MENU};
  }

  toggleFullscreen(): Action {
    return { type: AppActions.TOGGLE_FULLSCREEN};
  }
}
