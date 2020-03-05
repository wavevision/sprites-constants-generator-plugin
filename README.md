<p align="center"><a href="https://github.com/wavevision"><img alt="Wavevision s.r.o." src="https://wavevision.com/images/wavevision-logo.png" width="120" /></a></p>
<h1 align="center">Sprites Constants Generator Plugin</h1>

[![Build Status](https://travis-ci.org/wavevision/sprites-constants-generator-plugin.svg?branch=master)](https://travis-ci.org/wavevision/sprites-constants-generator-plugin)
[![Coverage Status](https://coveralls.io/repos/github/wavevision/sprites-constants-generator-plugin/badge.svg?branch=master)](https://coveralls.io/github/wavevision/sprites-constants-generator-plugin?branch=master)
[![npm (scoped)](https://img.shields.io/npm/v/@wavevision/sprites-constants-generator-plugin)](https://www.npmjs.com/package/@wavevision/sprites-constants-generator-plugin)
[![webpack](https://img.shields.io/badge/webpack-v4.x-blue)](https://github.com/webpack/webpack)

Webpack 4 plugin to generate PHP constants from SVG sprite symbol IDs based on [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader#runtime-generator) output.

## Package contents

- webpack [plugin](#plugin-options)
- runtime generator for [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader#runtime-generator)
- loader to de-colorize each SVG with `fill="currentColor"`

## Installation

Use [Yarn](https://yarnpkg.com)

```bash
yarn add --dev @wavevision/sprites-constants-generator-plugin
```

or [npm](https://npmjs.com)

```bash
npm install --save-dev @wavevision/sprites-constants-generator-plugin
```

> **Note**: It is highly recommended to install and include [svgxuse](https://github.com/Keyamoon/svgxuse) in your bundle.

## Usage

Assuming your sprites are loaded from `<entry>/images/<spriteName>/<image>.svg` and emitted into your build directory as `<outputPath>/images/<spriteName>.svg`, your webpack config can be:

```javascript
import { basename, dirname, resolve } from 'path';

import SpritesConstantsGeneratorPlugin from '@wavevision/sprites-constants-generator-plugin';
import SVGSpriteLoaderPlugin from 'svg-sprite-loader/plugin';

const images = 'images';
const sprites = ['icons', 'pictograms'];

export default {
  // configure entries and output
  // ...
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: sprites.map(s => resolve(__dirname, 'src', images, s)),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              runtimeGenerator:
                SpritesConstantsGeneratorPlugin.runtimeGenerator,
              spriteFilename: pathname =>
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
      namespace: 'App\\UI\\Sprites',
      output: resolve(__dirname, 'src', 'App', 'UI', 'Sprites'),
      replace: sprite => [`${sprite}-`, ''],
      sprites: sprites.map(s => `${images}/${s}.svg`),
    }),
  ],
};
```

This will output to `src/App/UI/Sprites`:

- **`Sprites.php`** containing constants with each sprite name
- for every sprite a **`<SpriteName>.php`** containing constants with each `symbolId` as configured in `svg-sprite-loader`

### Plugin options

#### `ignoreErrors?: boolean`

Run generator even if there are errors in webpack compilation. **This option is disabled by default.**

#### `namespace: string`

PHP namespace in which the generated classes will reside.

#### `output: string`

Absolute path to directory in which the generated classes will be put.

#### `replace?: (sprite: string) => [RegExp | string, string]`

Optional sprite name replacer function. Return a tuple in which:

- the first element is a search value
- the second element is a replacement

Replaces custom parts of sprite name **before** it is used in generated constants.

##### Example

You can see in our webpack config we set `symbolId: '[folder]-[name]'` and `spriteFilename` to use images directory name as sprite name. For images in `icons` folder, that will output `icons.svg` sprite in which each symbol will have `icons-<image>` ID. When generating the constants class this will result in duplicate `ICONS` prefix so you will use the constant as `Icons::ICONS_<image>`. If you want to omit that duplicate, use the function as shown in the example, so the result will be `Icons::<image>`.

#### `sprites: string[]`

List of sprite paths relative to webpack output path.

#### `useStaticClass?: boolean`

If `true`, the generated classes will use [`Nette\StaticClass`](https://api.nette.org/Nette/StaticClass.html) trait. **This option is enabled by default.**

#### `useStrictTypes?: boolean`

If `true`, the generated classes will have strict types declared. **This option is enabled by default.**
