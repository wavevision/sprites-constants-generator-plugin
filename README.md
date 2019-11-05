🚧 **Work In Progress** 🚧

# Wavevision Sprites Constants Generator Plugin

Webpack 4 plugin to generate PHP constants from SVG sprite symbol IDs based on [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader#runtime-generator) output.

## Package contents

- webpack plugin
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

export default {
  // configure entries and output
  // ...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              runtimeGenerator: require.resolve(
                '@wavevision/sprites-constants-generator-plugin/dist/runtimeGenerator',
              ),
              spriteFilename: pathname =>
                `images/${basename(dirname(pathname))}.svg`,
              symbolId: '[folder]-[name]',
            },
          },
          '@wavevision/sprites-constants-generator-plugin/dist/loader',
        ],
      },
    ],
  },
  plugins: [
    new SpritesConstantsGeneratorPlugin({
      namespace: 'App\\UI\\Sprites',
      output: resolve(__dirname, '..', 'src', 'App', 'UI', 'Sprites'),
      replace: sprite => `${sprite}-`,
      sprites: ['images/<spriteName>.svg'],
    }),
  ],
};
```

This will output to `src/App/UI/Sprites`:

- **`Sprites.php`** containing constants with each sprite name
- for every sprite a **`<SpriteName>.php`** containing constants with each `symbolId` as configured in `svg-sprite-loader`

## Plugin options

### `namespace: string`

PHP namespace in which the generated classes will reside.

### `output: string`

Absolute path to directory in which the generated classes will be put.

### `replace?: (sprite: string) => RegExp | string`

Optional function whose return value will be replaced with empty string in constant name. This is useful if you want to omit something in the name. 

#### Example

You can see in our webpack config we set `symbolId: '[folder]-[name]'`. For images in `icons` folder, that will output `icons.svg` sprite in which each symbol will have `icons-<image>` ID. When generating the constants class this will result in duplicate `ICONS` prefix so you will use the constant as `Icons::ICONS_<image>`. If you want to omit that duplicate, use the function as shown in example, so the result will be `Icons::<image>`.

### `useStaticClass?: boolean`

If `true`, the generated classes will use [`Nette\StaticClass`](https://api.nette.org/3.0/Nette/StaticClass.html) trait. **This option is enabled by default.**

### `useStrictTypes?: boolean`

If `true`, the generated classes will have strict types mode declare. **This option is enabled by default.**
