"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ProcessGroup = void 0;
var chalk_1 = __importDefault(require("chalk"));
var ProcessGroup = /** @class */ (function () {
    function ProcessGroup() {
    }
    ProcessGroup.prototype.run = function () {
        console.log('\n' + chalk_1["default"].black.bgCyan(' GROUP ') + ' ' + chalk_1["default"].cyan(this.groupName()));
        this.processes().forEach(function (process) { return process.run(); });
        console.log('\n' + chalk_1["default"].cyan('Group completed!'));
    };
    return ProcessGroup;
}());
exports.ProcessGroup = ProcessGroup;
