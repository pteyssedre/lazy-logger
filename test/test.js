var chai = require("chai");
var expect = chai.expect;
var LazyLog = require("../dist/index");
var LogLevel = LazyLog.LogLevel;
var Logger = LazyLog.Logger;


describe("Logger", function () {

    var Log = new Logger(LogLevel.ERROR);

    var data = function (){
        var e = Math.floor(Math.random() + 1) * 7;
    };
    var o = {
        name: "jena",
        email : "toto@jena.com"
    };
    it("Should log", function () {
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
    })
});