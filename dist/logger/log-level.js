"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARNING"] = 4] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 8] = "ERROR";
    LogLevel[LogLevel["CRITICAL"] = 16] = "CRITICAL";
    LogLevel[LogLevel["VERBOSE"] = 255] = "VERBOSE";
    LogLevel[LogLevel["NO_LOG"] = -1] = "NO_LOG";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
