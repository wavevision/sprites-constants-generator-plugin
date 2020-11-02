import { resolve } from 'path';

import webpack from 'webpack';
import { validate } from 'schema-utils';

import Generator from './Generator';
import schema from './schema';
import { Assets, Options } from './types';

const DIST = resolve(__dirname, '..', '..', 'dist');
const NAME = 'SpritesConstantsGeneratorPlugin';

class SpritesConstantsGeneratorPlugin {
  public constructor(options: Options) {
    this.options = { ...this.defaults, ...options };
    validate(schema, this.options, { name: NAME });
    this.generator = new Generator(this.options);
  }

  public static loader = `${DIST}/loader`;

  public static runtimeGenerator = `${DIST}/runtimeGenerator`;

  private readonly defaults: Partial<Options> = {
    ignoreErrors: false,
    useStaticClass: true,
    useStrictTypes: true,
  };

  private readonly generator: Generator;

  private readonly options: Options;

  private logger: webpack.Logger;

  public readonly apply = (compiler: webpack.Compiler): void => {
    compiler.hooks.thisCompilation.tap(NAME, compilation => {
      this.logger = compilation.getLogger(NAME);
    });
    compiler.hooks.afterEmit.tapAsync(NAME, this.run);
  };

  private readonly run = (
    compilation: webpack.compilation.Compilation,
    callback: () => void,
  ): void => {
    if (this.shouldRun(compilation)) {
      try {
        const messages = this.generator.run(this.getAssets(compilation));
        this.logger.group(NAME);
        messages.forEach(m => this.logger.info(m));
        this.logger.groupEnd();
      } catch (e) {
        compilation.errors.push(`${NAME}: ${e.message}`);
      }
    }
    callback();
  };

  private readonly getAssets = (
    compilation: webpack.compilation.Compilation,
  ): Assets => {
    const assets: Assets = {};
    for (const asset in compilation.assets) {
      if (this.options.sprites.includes(asset)) {
        assets[asset] = compilation.assets[asset];
      }
    }
    return assets;
  };

  private readonly shouldRun = (
    compilation: webpack.compilation.Compilation,
  ): boolean => {
    if (this.options.ignoreErrors === false) {
      return compilation.errors.length === 0;
    }
    return true;
  };
}

export default SpritesConstantsGeneratorPlugin;
