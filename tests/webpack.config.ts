import { basename, dirname, resolve } from 'path';

import SVGSpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import { Configuration } from 'webpack';

import SpritesConstantsGeneratorPlugin from '../src/SpritesConstantsGeneratorPlugin';

import { OUTPUT_PATH, SPRITES_DIR } from './constants';

const images = 'images';
const sprites = ['icons'];

const config: Configuration = {
  mode: 'production',
  entry: {
    index: resolve(__dirname, 'assets', 'index.ts'),
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
                `${images}/${basename(dirname(pathname))}.svg`,
              symbolId: '[folder]-[name]',
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
      sprites: sprites.map(s => `${images}/${s}.svg`),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
};

export default config;
