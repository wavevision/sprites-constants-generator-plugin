import { existsSync, readFileSync, rmdirSync } from 'fs';
import { resolve } from 'path';

import webpack from 'webpack';

import config from './webpack.config';
import { OUTPUT_PATH, SPRITES_DIR } from './constants';

jest.setTimeout(10000);

const assertConstant = (source: string, name: string, value: string): void =>
  expect(source.includes(`public const ${name} = '${value}';`)).toBe(true);

const assertStaticClass = (source: string): void =>
  expect(source.includes('use StaticClass;')).toBe(true);

const assertStrictTypes = (source: string): void =>
  expect(source.includes('<?php declare (strict_types = 1);')).toBe(true);

describe('SpritesConstantsGeneratorPlugin', () => {
  beforeAll(() => {
    [OUTPUT_PATH, SPRITES_DIR].forEach(path =>
      rmdirSync(path, { recursive: true }),
    );
  });
  it('compiles webpack assets', done => {
    const compiler = webpack(config);
    compiler.run((err, stats) => {
      expect(err).toBeNull();
      expect(stats.toJson().assets).toBeDefined();
      done();
    });
  });
  it('generated valid constants classes', () => {
    const iconsPath = resolve(SPRITES_DIR, 'Icons.php');
    const spritesPath = resolve(SPRITES_DIR, 'Sprites.php');
    expect(existsSync(spritesPath)).toBe(true);
    expect(existsSync(iconsPath)).toBe(true);
    const sprites = readFileSync(spritesPath).toString();
    assertConstant(sprites, 'ICONS', 'icons');
    assertStaticClass(sprites);
    assertStrictTypes(sprites);
    const icons = readFileSync(iconsPath).toString();
    assertConstant(icons, 'ACCOUNT', 'icons-account');
    assertConstant(icons, 'ADD', 'icons-add');
    assertStaticClass(icons);
    assertStrictTypes(icons);
  });
});
