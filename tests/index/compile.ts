import webpack from 'webpack';

import config from '../webpack.config';

// eslint-disable-next-line jest/no-export
export default (): void => {
  it('compiles webpack assets', () =>
    new Promise(done => {
      const compiler = webpack(config);
      compiler.run((err, stats) => {
        expect(err).toBeNull();
        expect(stats.toJson().assets).toBeDefined();
        done();
      });
    }));
};
