import * as webpack from 'webpack';

import PathManager from '../src/SpritesConstantsGeneratorPlugin/PathManager';

describe('PathManager', () => {
  describe('getOutputPath', () => {
    it('returns webpack-dev-server path', () => {
      const compilation1 = ({
        compiler: { options: { devServer: { host: 'localhost', port: 9000 } } },
      } as unknown) as webpack.compilation.Compilation;
      const pm1 = new PathManager(compilation1);
      expect(pm1.getOutputPath()).toBe('http://localhost:9000/');
      const compilation2 = ({
        compiler: {
          options: {
            devServer: {
              host: 'localhost',
              port: 9000,
              publicPath: 'http://localhost:9000',
            },
          },
        },
      } as unknown) as webpack.compilation.Compilation;
      const pm2 = new PathManager(compilation2);
      expect(pm2.getOutputPath()).toBe('http://localhost:9000');
    });
    it('throws error', () => {
      const compilation = ({
        compiler: { options: {} },
      } as unknown) as webpack.compilation.Compilation;
      const pm = new PathManager(compilation);
      expect(() => {
        pm.getOutputPath();
      }).toThrow('Unable to get webpack output path.');
    });
  });
});
