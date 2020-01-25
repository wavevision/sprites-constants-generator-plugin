import { basename, dirname } from 'path';

import SVGSpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import { Configuration } from 'webpack';

import SpritesConstantsGeneratorPlugin from '../src/SpritesConstantsGeneratorPlugin';

import { ENTRY, OUTPUT_PATH, SPRITES_DIR } from './constants';

const images = 'images';
const sprites = ['icons'];
const test = 'test';

export const makeConfig = (withError = false): Configuration => ({
  mode: 'production',
  entry: {
    index: ENTRY,
  },
  output: {
    path: OUTPUT_PATH,
    filename: 'index.js',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              runtimeGenerator:
                SpritesConstantsGeneratorPlugin.runtimeGenerator,
              spriteFilename: (pathname: string): string =>
                `${images}/${test}-${basename(dirname(pathname))}.svg`,
              symbolId: `${test}-[folder]-[name]`,
            },
          },
          SpritesConstantsGeneratorPlugin.loader,
        ],
      },
    ],
  },
  plugins: [
    new SVGSpriteLoaderPlugin({ plainSprite: true }),
    new SpritesConstantsGeneratorPlugin({
      namespace: 'App\\Sprites',
      output: SPRITES_DIR,
      replace: sprite => `${sprite}-`,
      sprites: sprites.map(s =>
        withError ? `${images}/${s}.svg` : `${images}/${test}-${s}.svg`,
      ),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
});

export default makeConfig();
