import { readFileSync } from 'fs';
import { basename, resolve as resolvePath } from 'path';
import { resolve as resolveUrl } from 'url';

import $ from 'cheerio';

import PathManager from './PathManager';
import fetch from './fetch';
import makeFile from './makeFile';
import { logStart, logError } from './utils';
import { Options } from './types';

class Generator {
  public constructor(options: Options, pathManager: PathManager) {
    this.options = options;
    this.pathManager = pathManager;
  }

  private readonly options: Options;

  private readonly pathManager: PathManager;

  public readonly run = (): void => {
    logStart('🧩', 'SVG sprites constants generator');
    makeFile(
      'Sprites',
      this.options.sprites.map(s => {
        const value = this.getSpriteName(s);
        return { name: value.toUpperCase(), value };
      }),
      this.options,
    );
    this.options.sprites.forEach(this.makeSpriteFile);
  };

  private readonly getSpriteName = (sprite: string): string =>
    basename(sprite, '.svg');

  private readonly getSpriteContent = async (
    sprite: string,
  ): Promise<string | void> => {
    try {
      const path = this.pathManager.getOutputPath();
      if (this.pathManager.isDevServer()) {
        return await fetch(resolveUrl(path, sprite));
      }
      return readFileSync(resolvePath(path, sprite)).toString();
    } catch (e) {
      logError(e);
    }
  };

  private readonly makeSpriteFile = async (sprite: string): Promise<void> => {
    const content = await this.getSpriteContent(sprite);
    if (!content) {
      return logError(`Unable to get content of sprite "${sprite}".`);
    }
    const $content = $.load(content);
    const baseName = this.getSpriteName(sprite);
    const className = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    const constants: Array<{ name: string; value: string }> = [];
    $content('svg defs symbol').each(
      (index: number, element: CheerioElement) => {
        const value = $(element)
          .attr('id')
          .replace(`${baseName}-`, '');
        const name = value.replace(/-/g, '_').toUpperCase();
        constants.push({ name, value });
      },
    );
    await makeFile(className, constants, this.options);
  };
}

export default Generator;
