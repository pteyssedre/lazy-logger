import colors = require("colors");

export enum LogLevel {
    VERBOSE = 1 << 5,
    DEBUG = 1 << 4,
    INFO = 1 << 3,
    WARNING = 1 << 2,
    ERROR = 1 << 1,
    CRITICAL = 1 << 0
}

export class Logger {

    private level: LogLevel;
    private separator: string;

    constructor(level?: LogLevel) {
        if (isNaN(level)) {
            this.level = LogLevel.VERBOSE;
        }
        else {
            this.level = level;
        }
        this.separator = "[@]";
    }

    private formatLine(args: any[]): string {
        let line = "";
        let sep = this.separator.split("@");
        let b = sep[0];
        let a = sep[1];
        for (var i = 0; i < args.length; i++) {
            let str = "";
            let item = args[i];
            switch ((typeof item).toLowerCase()) {
                case "function":
                    let tr = b + item;
                    tr = tr.replace(/(\r\n|\n|\r)/gm, "");
                    while (tr.indexOf("  ") > -1) {
                        tr = tr.replace("  ", " ");
                    }
                    str += tr + a;
                    break;
                case "object":
                    str += b + JSON.stringify(item) + a;
                    break;
                default:
                    str += b + item + a;
                    break;
            }
            line += " " + str;
        }

        return line.trim();
    }

    private log(level: LogLevel, any: any[]): void {
        var data = [];
        data.push(LogLevel[level]);
        data.push(new Date().toISOString());
        for (var i = 0; i < any.length; i++) {
            data.push(any[i]);
        }
        let line = this.formatLine(data);
        console.log(line);
    }

    public v(...any: any[]): void {
        this.log(LogLevel.VERBOSE, any);
    }

    public i(...any: any[]): void {
        if (this.level >= LogLevel.INFO) {
            this.log(LogLevel.INFO, any);
        }
    }

    public d(...any: any[]): void {
        if (this.level >= LogLevel.DEBUG) {
            this.log(LogLevel.DEBUG, any);
        }
    }

    public w(...any: any[]): void {
        if (this.level >= LogLevel.WARNING) {
            this.log(LogLevel.WARNING, any);
        }
    }

    public e(...any: any[]): void {
        if (this.level >= LogLevel.ERROR) {
            this.log(LogLevel.ERROR, any);
        }
    }

    public c(...any: any[]): void {
        if (this.level >= LogLevel.CRITICAL) {
            this.log(LogLevel.CRITICAL, any);
        }
    }
}