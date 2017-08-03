import { Action } from 'redux';
import { CounterActions } from './actions';
import { Frame } from './frame';

export interface IAppState {
  frameIndex: number;
  frames: Frame[];
}

export const INITIAL_STATE: IAppState = {
  frameIndex: 0,
  frames: [{
      title: "First frame",
      content: "You are seeing the first.frame();",
      type: "basic",
      style: {
        color: "white",
        bgColor: "#2ecc71"
      }
    },{
      title: "Second frame",
      content: "You are seeing the second.frame();",
      type: "code",
      style: {
        color: "white",
        bgColor: "#2980b9"
      },
      code: {
        label: 'ex1',
        source: 'const test = require("testing");',
        language: "javascript"
      }
  },{
      title: "Third frame",
      content: "You are seeing the third.frame();",
      type: "code",
      style: {
        color: "white",
        bgColor: "#f39c12"
      },
      code: {
        label: 'ex2',
        source: '<img src="example2.png">',
        language: "markup"
      }
    },{
      title: "Fourth frame",
      content: "You are seeing the fourth.frame();",
      type: "code",
      style: {
        color: "white",
        bgColor: "#c0392b"
      },
      code: {
        label: 'ex3',
        source: '<img src="example3.png">',
        language: "markup"
      }
    }]
};

export function rootReducer(lastState: IAppState, action: Action): IAppState {
  switch(action.type) {
    case CounterActions.INCREMENT_FRAME_INDEX: 
        // console.log("increment frame", lastState.frameIndex)
        // Do nothing if frameIndex exceeds the number of frames
        if (lastState.frameIndex+1 >= lastState.frames.length) return lastState;
        return Object.assign({}, lastState, {
        frameIndex: lastState.frameIndex + 1
      })
    case CounterActions.DECREMENT_FRAME_INDEX: 
        // console.log("decrement frame", lastState.frameIndex)
        // Do nothing if frameIndex is negative
        if (lastState.frameIndex <= 0) return lastState;
        return Object.assign({}, lastState, {
        frameIndex: lastState.frameIndex - 1
      })
  }

  // We don't care about any other actions right now.
  return lastState;
}