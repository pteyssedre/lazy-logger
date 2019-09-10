"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var circular = require("circular-json");
var colors = require("colors");
var log_level_1 = require("../log-level");
var LogLevelText;
(function (LogLevelText) {
    LogLevelText[LogLevelText["VER"] = 255] = "VER";
    LogLevelText[LogLevelText["DEB"] = 1] = "DEB";
    LogLevelText[LogLevelText["INF"] = 2] = "INF";
    LogLevelText[LogLevelText["WAR"] = 4] = "WAR";
    LogLevelText[LogLevelText["ERR"] = 8] = "ERR";
    LogLevelText[LogLevelText["CRI"] = 16] = "CRI";
    LogLevelText[LogLevelText["NOL"] = -1] = "NOL";
})(LogLevelText || (LogLevelText = {}));
var ConsoleLogPipe = /** @class */ (function () {
    function ConsoleLogPipe(options) {
        this.options = options;
    }
    ConsoleLogPipe.prototype.formatLine = function (level, args) {
        var ba = this.options.separator.split('@');
        var b = ba[0];
        var a = ba[1];
        var line = b + LogLevelText[level] + a;
        for (var i = 0; i < args.length; i++) {
            var str = "";
            var item = args[i];
            switch ((typeof item).toLowerCase()) {
                case "function":
                    var tr = b + item;
                    tr = tr.replace(/(\r\n|\n|\r)/gm, "");
                    while (tr.indexOf("  ") > -1) {
                        tr = tr.replace("  ", " ");
                    }
                    str += tr.trim() + a;
                    break;
                case "object":
                    str += b + circular.stringify(item) + a;
                    break;
                default:
                    str += b + item + a;
                    break;
            }
            line += " " + str.trim();
        }
        return line.trim();
    };
    ConsoleLogPipe.prototype.log = function (level, data) {
        var line = this.formatLine(level, data);
        var color = colors.gray;
        switch (level) {
            case log_level_1.LogLevel.NO_LOG:
                break;
            case log_level_1.LogLevel.VERBOSE:
                break;
            case log_level_1.LogLevel.DEBUG:
                color = colors.cyan;
                break;
            case log_level_1.LogLevel.INFO:
                color = colors.green;
                break;
            case log_level_1.LogLevel.WARNING:
                color = colors.yellow;
                break;
            case log_level_1.LogLevel.ERROR:
                color = colors.red;
                break;
            case log_level_1.LogLevel.CRITICAL:
                color = colors.red;
                break;
        }
        console.log(color(line));
    };
    return ConsoleLogPipe;
}());
exports.ConsoleLogPipe = ConsoleLogPipe;
