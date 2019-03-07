import { Logger } from "../index";
import { LogLevel } from "../logger/log-level";
import chai = require('chai');

const expect = chai.expect;


describe("Logger", function () {

    let data = function () {
        let e = Math.floor(Math.random() + 1) * 7;
        return e + "-" + e;
    };
    let o = {
        name: "jena",
        email: "toto@jena.com"
    };
    it("Should log data into a queue", () => {
        const log = new Logger();
        log.d("data", data, ["test", "mocha"]);
        const lines = log.flushQueue();
        expect(lines.length).to.be.equal(1);
    });
    it("Should log every line", () => {
        const Log = new Logger();
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        const lines = Log.flushQueue();
        expect(lines.length).to.be.equal(6);
    });
    it("Should log INFO and above", () => {
        let Log = new Logger({level: LogLevel.INFO});
        Log.v("verbose", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.i("info", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        const lines = Log.flushQueue();
        expect(lines.length).to.be.equal(5);
    });
    it("Should log WARNING and above", () => {
        let Log = new Logger({level: LogLevel.WARNING});
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        const lines = Log.flushQueue();
        expect(lines.length).to.be.equal(4);
    });
    it("Should log ERROR and above", () => {
        let Log = new Logger({level: LogLevel.ERROR});
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        const lines = Log.flushQueue();
        expect(lines.length).to.be.equal(3);
    });
    it("Should log CRITICAL and above", () => {
        let Log = new Logger({level: LogLevel.CRITICAL});
        Log.v("verbose", "test", o, data);
        Log.i("info", "test", o, data);
        Log.d("debug", "test", o, data);
        Log.w("warn", "test", o, data);
        Log.e("error", "test", o, data);
        Log.c("critical", "test", o, data);
        const lines = Log.flushQueue();
        expect(lines.length).to.be.equal(2);
    });

    it("Should change LogLevel as the program runs", async () => {
        const options = {
            level: LogLevel.CRITICAL
        };
        let log = new Logger(options);
        log.d("should not appear");
        setTimeout(() => {
            options.level = LogLevel.VERBOSE;
        }, 400);
        for (let i = 0; i < 10; i++) {
            log.d("should appear", i, "loop");
            await wait(800);
        }
        const lines = log.flushQueue();
        expect(lines.length).to.be.equal(9);
    });
});

function wait(time: number): Promise<any> {
    return new Promise<any>(resolve => {
        setTimeout(() => {
            return resolve();
        }, time);
    });
}