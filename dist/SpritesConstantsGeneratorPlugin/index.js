var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "schema-utils", "webpack", "./Generator", "./PathManager", "./schema"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schema_utils_1 = __importDefault(require("schema-utils"));
    var webpack = __importStar(require("webpack"));
    var Generator_1 = __importDefault(require("./Generator"));
    var PathManager_1 = __importDefault(require("./PathManager"));
    var schema_1 = __importDefault(require("./schema"));
    var NAME = 'SpritesConstantsGeneratorPlugin';
    var SpritesConstantsGeneratorPlugin = /** @class */ (function (_super) {
        __extends(SpritesConstantsGeneratorPlugin, _super);
        function SpritesConstantsGeneratorPlugin(options) {
            var _this = _super.call(this) || this;
            _this.defaults = {
                useStaticClass: true,
                useStrictTypes: true,
            };
            _this.options = __assign(__assign({}, _this.defaults), options);
            schema_utils_1.default(schema_1.default, _this.options, { name: NAME });
            return _this;
        }
        SpritesConstantsGeneratorPlugin.prototype.apply = function (compiler) {
            compiler.hooks.afterEmit.tap(NAME, this.run);
        };
        SpritesConstantsGeneratorPlugin.prototype.run = function (compilation) {
            if (!this.generator) {
                this.generator = new Generator_1.default(this.options, new PathManager_1.default(compilation));
            }
            this.generator.run();
        };
        return SpritesConstantsGeneratorPlugin;
    }(webpack.Plugin));
    exports.default = SpritesConstantsGeneratorPlugin;
});
//# sourceMappingURL=index.js.map