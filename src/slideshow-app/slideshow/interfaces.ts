export interface ISlide {
    title?: string;
    content?: string[];
    style?: IStyle;
    code?: ICode;
}

export interface IStyle {
    bgColor: string;
    color: string;
}

export interface ICode {
    source: string | string[];
    language: string;
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface ISliderEvent {
    source: any;
    value: number;
}
