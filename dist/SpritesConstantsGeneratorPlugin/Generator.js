var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "path", "cheerio", "./fetch", "./makeFile", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_1 = require("fs");
    var path_1 = require("path");
    var cheerio_1 = __importDefault(require("cheerio"));
    var fetch_1 = __importDefault(require("./fetch"));
    var makeFile_1 = __importDefault(require("./makeFile"));
    var utils_1 = require("./utils");
    var Generator = /** @class */ (function () {
        function Generator(options, pathManager) {
            this.getSpriteName = function (sprite) {
                return path_1.basename(sprite, '.svg');
            };
            this.options = options;
            this.pathManager = pathManager;
        }
        Generator.prototype.run = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            utils_1.logStart('🧩', 'SVG sprites constants generator');
                            return [4 /*yield*/, makeFile_1.default('Sprites', this.options.sprites.map(function (s) {
                                    var value = _this.getSpriteName(s);
                                    return { name: value.toUpperCase(), value: value };
                                }), this.options)];
                        case 1:
                            _a.sent();
                            this.options.sprites.forEach(this.makeSpriteFile);
                            return [2 /*return*/];
                    }
                });
            });
        };
        Generator.prototype.getSpriteContent = function (sprite) {
            return __awaiter(this, void 0, void 0, function () {
                var path, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            path = path_1.join(this.pathManager.getOutputPath(), sprite);
                            if (!this.pathManager.isDevServer()) return [3 /*break*/, 2];
                            return [4 /*yield*/, fetch_1.default(path)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [2 /*return*/, fs_1.readFileSync(path).toString()];
                        case 3:
                            e_1 = _a.sent();
                            utils_1.logError(e_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Generator.prototype.makeSpriteFile = function (sprite) {
            return __awaiter(this, void 0, void 0, function () {
                var content, $content, baseName, className, constants;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getSpriteContent(sprite)];
                        case 1:
                            content = _a.sent();
                            if (!content) {
                                return [2 /*return*/, utils_1.logError("Unable to get content of sprite \"" + sprite + "\".")];
                            }
                            $content = cheerio_1.default.load(content);
                            baseName = this.getSpriteName(sprite);
                            className = baseName.charAt(0).toUpperCase() + baseName.slice(1);
                            constants = [];
                            $content('svg defs symbol').each(function (index, element) {
                                var value = cheerio_1.default(element)
                                    .attr('id')
                                    .replace(baseName + "-", '');
                                var name = value.replace(/-/g, '_').toUpperCase();
                                constants.push({ name: name, value: value });
                            });
                            return [4 /*yield*/, makeFile_1.default(className, constants, this.options)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Generator;
    }());
    exports.default = Generator;
});
//# sourceMappingURL=Generator.js.map