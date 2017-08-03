import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class CounterActions {
  static INCREMENT_FRAME_INDEX = 'INCREMENT_FRAME_INDEX';
  static DECREMENT_FRAME_INDEX = 'DECREMENT_FRAME_INDEX';

  increment(): Action {
    return { type: CounterActions.INCREMENT_FRAME_INDEX };
  }

  decrement(): Action {
    return { type: CounterActions.DECREMENT_FRAME_INDEX };
  }
}