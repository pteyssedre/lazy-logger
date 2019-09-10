"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var log_level_1 = require("../logger/log-level");
var chai = require("chai");
var expect = chai.expect;
describe("Logger", function () {
    var _this = this;
    var data = function () {
        var e = Math.floor(Math.random() + 1) * 7;
        return e + "-" + e;
    };
    var o = {
        name: "jena",
        email: "toto@jena.com"
    };
    it("Should log data into a queue", function () {
        var log = new index_1.Logger({ separator: "@" });
        log.d("data", data, ["test", "mocha"]);
        var lines = log.flushQueue();
        expect(lines.length).to.be.equal(1);
    });
    it("Should log every line", function () {
        var Log = new index_1.Logger();
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        var lines = Log.flushQueue();
        expect(lines.length).to.be.equal(6);
    });
    it("Should log INFO and above", function () {
        var Log = new index_1.Logger({ level: log_level_1.LogLevel.INFO });
        Log.v("verbose", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.i("info", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        var lines = Log.flushQueue();
        expect(lines.length).to.be.equal(5);
    });
    it("Should log WARNING and above", function () {
        var Log = new index_1.Logger({ level: log_level_1.LogLevel.WARNING });
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        var lines = Log.flushQueue();
        expect(lines.length).to.be.equal(4);
    });
    it("Should log ERROR and above", function () {
        var Log = new index_1.Logger({ level: log_level_1.LogLevel.ERROR });
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        var lines = Log.flushQueue();
        expect(lines.length).to.be.equal(3);
    });
    it("Should log CRITICAL and above", function () {
        var Log = new index_1.Logger({ level: log_level_1.LogLevel.CRITICAL });
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        var lines = Log.flushQueue();
        expect(lines.length).to.be.equal(2);
    });
    it("Should change LogLevel as the program runs", function () { return __awaiter(_this, void 0, void 0, function () {
        var options, log, i, lines;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        level: log_level_1.LogLevel.CRITICAL
                    };
                    log = new index_1.Logger(options);
                    log.d("should not appear");
                    setTimeout(function () {
                        options.level = log_level_1.LogLevel.VERBOSE;
                    }, 400);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 10)) return [3 /*break*/, 4];
                    log.d("should appear", i, "loop");
                    return [4 /*yield*/, wait(800)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    lines = log.flushQueue();
                    expect(lines.length).to.be.equal(9);
                    return [2 /*return*/];
            }
        });
    }); });
});
function wait(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            return resolve();
        }, time);
    });
}
