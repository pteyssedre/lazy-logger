"use strict";
(function (LogLevel) {
    LogLevel[LogLevel["VERBOSE"] = 32] = "VERBOSE";
    LogLevel[LogLevel["DEBUG"] = 16] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 8] = "INFO";
    LogLevel[LogLevel["WARNING"] = 4] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["CRITICAL"] = 1] = "CRITICAL";
    LogLevel[LogLevel["NO_LOG"] = -1] = "NO_LOG";
})(exports.LogLevel || (exports.LogLevel = {}));
var LogLevel = exports.LogLevel;
var Logger = (function () {
    function Logger(level) {
        if (isNaN(level)) {
            this.level = LogLevel.VERBOSE;
        }
        else {
            this.level = level;
        }
        this.separator = "[@]";
    }
    Logger.prototype.formatLine = function (args) {
        var line = "";
        var sep = this.separator.split("@");
        var b = sep[0];
        var a = sep[1];
        for (var i = 0; i < args.length; i++) {
            var str = "";
            var item = args[i];
            switch ((typeof item).toLowerCase()) {
                case "function":
                    var tr = b.trim() + item;
                    tr = tr.replace(/(\r\n|\n|\r)/gm, "");
                    while (tr.indexOf("  ") > -1) {
                        tr = tr.replace("  ", " ");
                    }
                    str += tr.trim() + a.trim();
                    break;
                case "object":
                    str += b.trim() + JSON.stringify(item) + a.trim();
                    break;
                default:
                    str += b.trim() + item + a.trim();
                    break;
            }
            line += " " + str.trim();
        }
        return line.trim();
    };
    Logger.prototype.log = function (level, any) {
        if (this.level == LogLevel.NO_LOG) {
            return;
        }
        var data = [];
        data.push(LogLevel[level]);
        data.push(new Date().toISOString());
        for (var i = 0; i < any.length; i++) {
            data.push(any[i]);
        }
        var line = this.formatLine(data);
        console.log(line);
    };
    Logger.prototype.v = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i - 0] = arguments[_i];
        }
        this.log(LogLevel.VERBOSE, any);
    };
    Logger.prototype.i = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i - 0] = arguments[_i];
        }
        if (this.level >= LogLevel.INFO) {
            this.log(LogLevel.INFO, any);
        }
    };
    Logger.prototype.d = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i - 0] = arguments[_i];
        }
        if (this.level >= LogLevel.DEBUG) {
            this.log(LogLevel.DEBUG, any);
        }
    };
    Logger.prototype.w = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i - 0] = arguments[_i];
        }
        if (this.level >= LogLevel.WARNING) {
            this.log(LogLevel.WARNING, any);
        }
    };
    Logger.prototype.e = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i - 0] = arguments[_i];
        }
        if (this.level >= LogLevel.ERROR) {
            this.log(LogLevel.ERROR, any);
        }
    };
    Logger.prototype.c = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i - 0] = arguments[_i];
        }
        if (this.level >= LogLevel.CRITICAL) {
            this.log(LogLevel.CRITICAL, any);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
