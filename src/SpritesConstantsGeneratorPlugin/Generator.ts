import { basename } from 'path';

import $ from 'cheerio';

import makeFile from './makeFile';
import { filterClassName } from './utils';
import { Assets, Options } from './types';

class Generator {
  public constructor(options: Options) {
    this.options = options;
  }

  private readonly options: Options;

  public readonly run = (sprites: Assets): string[] => {
    const messages: string[] = [];
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
      messages.push(this.makeSpriteFile(sprite, sprites[sprite].source()));
    }
    return messages;
  };

  private readonly getSpriteName = (sprite: string): string =>
    basename(sprite, '.svg');

  private readonly handleReplace = (sprite: string, value: string): string => {
    if (typeof this.options.replace === 'function') {
      return value.replace(this.options.replace(sprite), '');
    }
    return value;
  };

  private readonly makeConstantName = (value: string): string =>
    value.replace(/-/g, '_').toUpperCase();

  private readonly makeSpriteFile = (
    sprite: string,
    source: string,
  ): string => {
    const $content = $.load(source);
    const baseName = this.getSpriteName(sprite);
    const className = filterClassName(baseName);
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
