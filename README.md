🚧 **Work In Progress** 🚧

# Wavevision Sprites Constants Generator Plugin

Webpack 4 plugin to generate PHP constants from SVG sprite symbol IDs.

## Package contents

- webpack plugin
- runtime generator for [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader#runtime-generator)
- loader to de-colorize each SVG with `fill="currentColor"`

## Installation

```bash
yarn add --dev @wavevision/sprites-constants-generator-plugin
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
      sprites: ['images/<spriteName>.svg'],
    }),
  ],
};
```

This will output to `src/App/UI/Sprites`:

- **`Sprites.php`** containing constants with each sprite name
- for every sprite a **`<SpriteName>.php`** containing constants with each `symbolId` as configured in `svg-sprite-loader`
