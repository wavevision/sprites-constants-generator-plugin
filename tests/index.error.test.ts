import webpack from 'webpack';

import { makeConfig } from './webpack.config';

describe('SpritesConstantsGeneratorPlugin error', () => {
  it('fails webpack compilation with error', () =>
    new Promise(done => {
      const compiler = webpack(makeConfig(true));
      compiler.run(err => {
        expect(err).toBeDefined();
        done();
      });
    }));
});
