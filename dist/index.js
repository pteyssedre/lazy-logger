"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var log_level_1 = require("./logger/log-level");
var log_options_1 = require("./logger/log-options");
var log_options_2 = require("./logger/log-options");
exports.LogOptions = log_options_2.LogOptions;
var log_level_2 = require("./logger/log-level");
exports.LogLevel = log_level_2.LogLevel;
var Logger = /** @class */ (function () {
    function Logger(options) {
        this.options = log_options_1.LogOptions.enhanceOptions(options);
        if (!this.options.class) {
            this.options.class = this.constructor.name;
        }
        this.queue = [];
    }
    Logger.prototype.push = function (level, data) {
        this.queue.push({ level: level, data: data });
        this.options.pipes.forEach(function (pipe) {
            pipe.log(level, data);
        });
    };
    Logger.prototype.use = function (pipe) {
        this.options.pipes.push(pipe);
    };
    Logger.prototype.v = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i] = arguments[_i];
        }
        this.log(log_level_1.LogLevel.VERBOSE, any);
    };
    Logger.prototype.i = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i] = arguments[_i];
        }
        this.log(log_level_1.LogLevel.INFO, any);
    };
    Logger.prototype.d = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i] = arguments[_i];
        }
        this.log(log_level_1.LogLevel.DEBUG, any);
    };
    Logger.prototype.w = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i] = arguments[_i];
        }
        this.log(log_level_1.LogLevel.WARNING, any);
    };
    Logger.prototype.e = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i] = arguments[_i];
        }
        this.log(log_level_1.LogLevel.ERROR, any);
    };
    Logger.prototype.c = function () {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            any[_i] = arguments[_i];
        }
        this.log(log_level_1.LogLevel.CRITICAL, any);
    };
    Logger.prototype.flushQueue = function (start, end) {
        if (isNaN(start)) {
            start = 0;
        }
        if (isNaN(end)) {
            end = this.queue.length;
        }
        return this.queue.slice(start, end);
    };
    Logger.prototype.isEnabled = function (logLevel) {
        if (this.options.level == log_level_1.LogLevel.NO_LOG) {
            return false;
        }
        return (this.options.level & logLevel) === logLevel || (this.options.level <= logLevel);
    };
    Object.defineProperty(Logger.prototype, "currentTime", {
        get: function () {
            return moment(new Date()).utc().format('YYYY-MM-DDTHH:mm:ss.SSSSSSSZ');
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.log = function (level, any) {
        if (this.isEnabled(level)) {
            var data = [];
            data.push(this.currentTime);
            if (this.options.class)
                data.push(this.options.class);
            data.push.apply(data, any);
            this.push(level, data);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
