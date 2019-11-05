import * as webpack from 'webpack';
declare class PathManager {
    constructor(compilation: webpack.compilation.Compilation);
    private readonly configuration;
    getOutputPath(): string;
    isDevServer(): boolean;
}
export default PathManager;
