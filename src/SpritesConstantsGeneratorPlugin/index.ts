import { resolve } from 'path';

import validate from 'schema-utils';

import webpack from 'webpack';

import Generator from './Generator';
import PathManager from './PathManager';
import schema from './schema';
import { Options } from './types';
import { logStart, logSuccess } from './utils';

const DIST = resolve(__dirname, '..', '..', 'dist');
const NAME = 'SpritesConstantsGeneratorPlugin';

class SpritesConstantsGeneratorPlugin {
  public constructor(options: Options) {
    this.options = { ...this.defaults, ...options };
    validate(schema, this.options, { name: NAME });
  }

  public static loader = `${DIST}/loader`;

  public static runtimeGenerator = `${DIST}/runtimeGenerator`;

  private readonly defaults: Partial<Options> = {
    ignoreErrors: false,
    useStaticClass: true,
    useStrictTypes: true,
  };

  private readonly options: Options;

  private generator: Generator;

  public readonly apply = (compiler: webpack.Compiler): void => {
    compiler.hooks.done.tapPromise(NAME, this.run);
  };

  private readonly run = async ({
    compilation,
  }: webpack.Stats): Promise<void> => {
    if (!this.shouldRun(compilation)) return;
    if (!this.generator) {
      this.generator = new Generator(
        this.options,
        new PathManager(compilation),
      );
    }
    const messages = await this.generator.run();
    logStart('🧩', 'SVG sprites constants generator');
    messages.forEach(logSuccess);
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
