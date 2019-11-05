import * as webpack from 'webpack';
import { Options } from './types';
declare class SpritesConstantsGeneratorPlugin extends webpack.Plugin {
    constructor(options: Options);
    private readonly defaults;
    private readonly options;
    private generator;
    apply(compiler: webpack.Compiler): void;
    private run;
}
export default SpritesConstantsGeneratorPlugin;
