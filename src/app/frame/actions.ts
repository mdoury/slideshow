import { Injectable } from '@angular/core';
import { IAction } from './interfaces';

@Injectable()
export class AppActions {
  static NEXT_FRAME = 'NEXT_FRAME';
  static PREV_FRAME = 'PREV_FRAME';
  static GO_TO_FRAME = 'GO_TO_FRAME';
  static TOGGLE_MENU = 'TOGGLE_MENU';
  static TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';
  static LOAD_FRAMES = 'LOAD_FRAMES';

  loadFrames(data): IAction {
    return { type: AppActions.LOAD_FRAMES, payload: data };
  }

  nextFrame(): IAction {
    return { type: AppActions.NEXT_FRAME };
  }

  prevFrame(): IAction {
    return { type: AppActions.PREV_FRAME };
  }

  goToFrame(frameIndex:number): IAction {
    return { type: AppActions.GO_TO_FRAME, payload: frameIndex };
  }

  toggleMenu(): IAction {
    return { type: AppActions.TOGGLE_MENU};
  }

  toggleFullscreen(): IAction {
    return { type: AppActions.TOGGLE_FULLSCREEN};
  }
}
