import PathManager from './PathManager';
import { Options } from './types';
declare class Generator {
    constructor(options: Options, pathManager: PathManager);
    private readonly options;
    private readonly pathManager;
    run(): Promise<void>;
    private readonly getSpriteName;
    private getSpriteContent;
    private makeSpriteFile;
}
export default Generator;
