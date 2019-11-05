(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "http"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var http_1 = require("http");
    var fetch = function (url) {
        return new Promise(function (resolve, reject) {
            var request = http_1.get(url, function (response) {
                if (response.statusCode !== 200) {
                    reject(new Error('Unable to fetch sprite contents from webpack-dev-server.'));
                }
                var data = [];
                response.on('data', function (chunk) { return data.push(chunk); });
                response.on('end', function () { return resolve(data.join('')); });
            });
            request.on('error', function (error) { return reject(error); });
        });
    };
    exports.default = fetch;
});
//# sourceMappingURL=fetch.js.map