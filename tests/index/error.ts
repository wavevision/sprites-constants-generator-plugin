import webpack from 'webpack';

import { makeConfig } from '../webpack.config';

// eslint-disable-next-line jest/no-export
export default (): void => {
  it('fails webpack compilation with error', () =>
    new Promise(done => {
      const compiler = webpack(makeConfig(true));
      compiler.run(err => {
        expect(err).toBeDefined();
        done();
      });
    }));
};
