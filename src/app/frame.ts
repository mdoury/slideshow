import { Code } from './code';

export class Frame {
    type = 'basic';
    title?: string;
    content?: string;
    style?: {
        color: string;
        bgColor: string;
    };
    code?: Code;

}
