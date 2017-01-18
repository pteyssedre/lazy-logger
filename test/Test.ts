import chai = require("chai");
import LazyLog = require("../index");


describe("Logger", function () {

    let Log = new LazyLog.Logger();

    let data = function () {
        let e = Math.floor(Math.random() + 1) * 7;
        return e + "-" + e;
    };
    let o = {
        name: "jena",
        email: "toto@jena.com"
    };
    it("Should log every line", () => {
        Log.v("verbose", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.i("info", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
    });
    it("Should log every line", () => {
        let Log = new LazyLog.Logger(LazyLog.LogLevel.DEBUG);
        Log.v("verbose", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.i("info", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
    });
    it("Should log all but DEBUG", () => {
        let Log = new LazyLog.Logger(LazyLog.LogLevel.INFO);
        Log.v("verbose", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.i("info", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
    });
    it("Should log WARNING and above", () => {
        let Log = new LazyLog.Logger(LazyLog.LogLevel.WARNING);
        Log.v("verbose", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.i("info", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
    });
    it("Should log ERROR and above", () => {
        let Log = new LazyLog.Logger(LazyLog.LogLevel.ERROR);
        Log.v("verbose", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.i("info", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
    });
    it("Should log CRITICAL and above", () => {
        let Log = new LazyLog.Logger(LazyLog.LogLevel.CRITICAL);
        Log.v("verbose", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.i("info", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
    });
});