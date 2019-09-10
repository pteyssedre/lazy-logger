"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_level_1 = require("./log-level");
var console_log_pipe_1 = require("./pipe/console-log-pipe");
var LogOptions = /** @class */ (function () {
    function LogOptions(klass, level, tags, pipes, separator) {
        if (level === void 0) { level = log_level_1.LogLevel.VERBOSE; }
        if (tags === void 0) { tags = []; }
        if (pipes === void 0) { pipes = []; }
        if (separator === void 0) { separator = "[@]"; }
        this.class = klass;
        this.level = level;
        this.tags = tags;
        this.separator = separator;
        this.pipes = pipes;
        if (!this.pipes || this.pipes.length === 0) {
            this.pipes = [new console_log_pipe_1.ConsoleLogPipe(separator)];
        }
    }
    LogOptions.enhanceOptions = function (options) {
        var opts = new LogOptions();
        if (!options) {
            options = opts;
            return opts;
        }
        var defaults = Object.keys(opts);
        var presents = Object.keys(options);
        var missing = defaults.filter(function (key) { return presents.indexOf(key) === -1; });
        for (var _i = 0, missing_1 = missing; _i < missing_1.length; _i++) {
            var key = missing_1[_i];
            options[key] = opts[key];
        }
        return options;
    };
    return LogOptions;
}());
exports.LogOptions = LogOptions;
