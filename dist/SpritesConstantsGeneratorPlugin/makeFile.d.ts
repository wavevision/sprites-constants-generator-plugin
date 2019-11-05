import { Options } from './types';
declare const makeFile: (className: string, constants: {
    name: string;
    value: string;
}[], options: Options) => Promise<void>;
export default makeFile;
