var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* eslint no-console: 'off' */
    var chalk_1 = __importDefault(require("chalk"));
    exports.logError = function (message) {
        console.log(chalk_1.default.red('✖'), chalk_1.default.red(message));
    };
    exports.logStart = function (icon, message) {
        console.log();
        console.log(icon, chalk_1.default.blue.bold.underline(message));
        console.log();
    };
    exports.logSuccess = function (message) {
        return console.log(chalk_1.default.green('✔'), message);
    };
});
//# sourceMappingURL=utils.js.map