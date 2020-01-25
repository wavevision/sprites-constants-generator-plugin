import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';

import { SPRITES_DIR } from '../constants';

const assertConstant = (source: string, name: string, value: string): void =>
  expect(source.includes(`public const ${name} = '${value}';`)).toBe(true);

const assertStaticClass = (source: string): void =>
  expect(source.includes('use StaticClass;')).toBe(true);

const assertStrictTypes = (source: string): void =>
  expect(source.includes('<?php declare (strict_types = 1);')).toBe(true);

// eslint-disable-next-line jest/no-export
export default (): void => {
  it('generated valid constants classes', () =>
    new Promise(done => {
      const iconsPath = resolve(SPRITES_DIR, 'TestIcons.php');
      const spritesPath = resolve(SPRITES_DIR, 'Sprites.php');
      expect(existsSync(spritesPath)).toBe(true);
      expect(existsSync(iconsPath)).toBe(true);
      const sprites = readFileSync(spritesPath).toString();
      assertConstant(sprites, 'TEST_ICONS', 'test-icons');
      assertStaticClass(sprites);
      assertStrictTypes(sprites);
      const icons = readFileSync(iconsPath).toString();
      assertConstant(icons, 'ACCOUNT', 'test-icons-account');
      assertConstant(icons, 'ADD', 'test-icons-add');
      assertStaticClass(icons);
      assertStrictTypes(icons);
      done();
    }));
};
