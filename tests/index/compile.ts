import webpack from 'webpack';

import config from '../webpack.config';

export default (): void => {
  it('compiles webpack assets', () =>
    new Promise<void>(done => {
      const compiler = webpack(config);
      compiler.run((err, stats) => {
        expect(err).toBeNull();
        expect(stats.toJson().assets).toBeDefined();
        done();
      });
    }));
};
