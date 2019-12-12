import { readFileSync } from 'fs';
import { basename, resolve as resolvePath } from 'path';
import { resolve as resolveUrl } from 'url';

import $ from 'cheerio';

import PathManager from './PathManager';
import fetch from './fetch';
import makeFile from './makeFile';
import { Options } from './types';

class Generator {
  public constructor(options: Options, pathManager: PathManager) {
    this.options = options;
    this.pathManager = pathManager;
  }

  private readonly options: Options;

  private readonly pathManager: PathManager;

  public readonly run = async (): Promise<string[]> => {
    const messages: Array<Promise<string>> = [];
    messages.push(
      makeFile(
        'Sprites',
        this.options.sprites.map(s => {
          const value = this.getSpriteName(s);
          return { name: this.makeConstantName(value), value };
        }),
        this.options,
      ),
    );
    for (const sprite of this.options.sprites) {
      messages.push(this.makeSpriteFile(sprite));
    }
    return Promise.all(messages);
  };

  private readonly getSpriteName = (sprite: string): string =>
    basename(sprite, '.svg');

  private readonly getSpriteContent = async (
    sprite: string,
  ): Promise<string> => {
    const path = this.pathManager.getOutputPath();
    if (this.pathManager.isDevServer()) {
      return fetch(resolveUrl(path, sprite));
    }
    return readFileSync(resolvePath(path, sprite)).toString();
  };

  private readonly handleReplace = (sprite: string, value: string): string => {
    if (typeof this.options.replace === 'function') {
      return value.replace(this.options.replace(sprite), '');
    }
    return value;
  };

  private readonly makeConstantName = (value: string): string =>
    value.replace(/-/g, '_').toUpperCase();

  private readonly makeSpriteFile = async (sprite: string): Promise<string> => {
    const content = await this.getSpriteContent(sprite);
    const $content = $.load(content);
    const baseName = this.getSpriteName(sprite);
    const className = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    const constants: Array<{ name: string; value: string }> = [];
    $content('svg defs symbol').each(
      (index: number, element: CheerioElement) => {
        const value = $(element).attr('id');
        if (!value) {
          throw new Error('SVG symbol ID is missing.');
        }
        constants.push({
          name: this.makeConstantName(this.handleReplace(baseName, value)),
          value,
        });
      },
    );
    return makeFile(className, constants, this.options);
  };
}

export default Generator;
