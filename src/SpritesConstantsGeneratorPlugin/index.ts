import validate from 'schema-utils';
import * as webpack from 'webpack';

import Generator from './Generator';
import PathManager from './PathManager';
import schema from './schema';
import { Options } from './types';

const NAME = 'SpritesConstantsGeneratorPlugin';

class SpritesConstantsGeneratorPlugin extends webpack.Plugin {
  public constructor(options: Options) {
    super();
    this.options = { ...this.defaults, ...options };
    validate(schema, this.options, { name: NAME });
  }

  private readonly defaults: Partial<Options> = {
    useStaticClass: true,
    useStrictTypes: true,
  };

  private readonly options: Options;

  private generator: Generator;

  public apply(compiler: webpack.Compiler): void {
    compiler.hooks.afterEmit.tap(NAME, this.run);
  }

  private run(compilation: webpack.compilation.Compilation): void {
    if (!this.generator) {
      this.generator = new Generator(
        this.options,
        new PathManager(compilation),
      );
    }
    this.generator.run();
  }
}

export default SpritesConstantsGeneratorPlugin;
