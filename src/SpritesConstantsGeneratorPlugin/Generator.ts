import { readFileSync } from 'fs';
import { basename, join } from 'path';

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

  public async run(): Promise<void> {
    logStart('🧩', 'SVG sprites constants generator');
    await makeFile(
      'Sprites',
      this.options.sprites.map(s => {
        const value = this.getSpriteName(s);
        return { name: value.toUpperCase(), value };
      }),
      this.options,
    );
    this.options.sprites.forEach(this.makeSpriteFile);
  }

  private readonly getSpriteName = (sprite: string): string =>
    basename(sprite, '.svg');

  private async getSpriteContent(sprite: string): Promise<string | void> {
    try {
      const path = join(this.pathManager.getOutputPath(), sprite);
      if (this.pathManager.isDevServer()) {
        return await fetch(path);
      }
      return readFileSync(path).toString();
    } catch (e) {
      logError(e);
    }
  }

  private async makeSpriteFile(sprite: string): Promise<void> {
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
  }
}

export default Generator;
