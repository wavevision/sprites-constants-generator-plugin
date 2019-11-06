import { resolve } from 'url';

import * as webpack from 'webpack';

class PathManager {
  public constructor(compilation: webpack.compilation.Compilation) {
    this.configuration = compilation.compiler.options;
  }

  private readonly configuration: webpack.Configuration;

  public readonly getOutputPath = (): string => {
    const { output, devServer } = this.configuration;
    if (devServer) {
      const { publicPath } = devServer;
      const url = `${devServer.https ? 'https' : 'http'}://${devServer.host}:${
        devServer.port
      }`;
      if (publicPath && publicPath.includes(url)) {
        return publicPath;
      }
      return resolve(url, publicPath || '/');
    }
    if (output && output.path) {
      return output.path;
    }
    throw new Error('Unable to get webpack output path.');
  };

  public readonly isDevServer = (): boolean =>
    this.configuration.devServer !== undefined;
}

export default PathManager;
