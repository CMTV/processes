"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Process = void 0;
var chalk_1 = __importDefault(require("chalk"));
var Process = /** @class */ (function () {
    function Process() {
    }
    Process.prototype.clearStage = function () { this.stage = null; };
    Process.prototype.run = function () {
        Process.currentProcess = this;
        var beginTime = Date.now();
        console.log('\n' + chalk_1["default"].bold(this.processName(), '...'));
        try {
            this.process();
        }
        catch (e) {
            console.log('❌', ' ' + chalk_1["default"].bold.red('Error!') + (this.stage ? chalk_1["default"].red(' Stage: ') + chalk_1["default"].bold.red(this.stage) : ''));
            throw new Error(e.stack);
        }
        var endTime = Date.now();
        console.log('✔️', ' ' + chalk_1["default"].bold.green('Ready!') + ' ' + chalk_1["default"].grey((endTime - beginTime) + 'ms'));
    };
    Process.log = function (toLog) {
        if (toLog === void 0) { toLog = null; }
        if (!this.currentProcess)
            return;
        console.log('\n💬', ' ' + chalk_1["default"].bold('Log') + (this.currentProcess.stage ? ' Stage: ' + chalk_1["default"].bold(this.currentProcess.stage) : ''));
        if (toLog)
            console.log(toLog, '\n');
    };
    Process.warning = function (toLog) {
        if (toLog === void 0) { toLog = null; }
        if (!this.currentProcess)
            return;
        console.log('\n⚠️', ' ' + chalk_1["default"].bold.yellow('Warning!') + (this.currentProcess.stage ? chalk_1["default"].yellow(' Stage: ') + chalk_1["default"].bold.yellow(this.currentProcess.stage) : ''));
        if (toLog)
            console.log(toLog, '\n');
    };
    return Process;
}());
exports.Process = Process;
