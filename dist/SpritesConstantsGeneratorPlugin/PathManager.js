(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path_1 = require("path");
    var PathManager = /** @class */ (function () {
        function PathManager(compilation) {
            this.configuration = compilation.compiler.options;
        }
        PathManager.prototype.getOutputPath = function () {
            var _a = this.configuration, output = _a.output, devServer = _a.devServer;
            if (devServer) {
                var publicPath = devServer.publicPath;
                var url = (devServer.https ? 'https' : 'http') + "://" + devServer.host + ":" + devServer.port;
                if (publicPath && publicPath.includes(url)) {
                    return publicPath;
                }
                return path_1.join(url, publicPath || '/');
            }
            if (output && output.path) {
                return output.path;
            }
            throw new Error('Unable to get webpack output path.');
        };
        PathManager.prototype.isDevServer = function () {
            return this.configuration.devServer !== undefined;
        };
        return PathManager;
    }());
    exports.default = PathManager;
});
//# sourceMappingURL=PathManager.js.map