import colors = require("colors");

export enum LogLevel {
    VERBOSE = 1 << 5,
    DEBUG = 1 << 4,
    INFO = 1 << 3,
    WARNING = 1 << 2,
    ERROR = 1 << 1,
    CRITICAL = 1 << 0,
    NO_LOG = -1
}
enum LogLevelText {
    VER = 1 << 5,
    DEB = 1 << 4,
    INF = 1 << 3,
    WAR = 1 << 2,
    ERR = 1 << 1,
    CRI = 1 << 0,
    NOL = -1
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
        for (let i = 0; i < args.length; i++) {
            let str = "";
            let item = args[i];
            switch ((typeof item).toLowerCase()) {
                case "function":
                    let tr = b.trim() + item;
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
    }

    private log(level: LogLevel, any: any[]): void {
        if (this.level == LogLevel.NO_LOG) {
            return;
        }
        let data = [];
        data.push(LogLevelText[level]);
        data.push(new Date().toISOString());
        for (let i = 0; i < any.length; i++) {
            data.push(any[i]);
        }
        let line = this.formatLine(data);
        let color = colors.gray;
        switch (level){
            case LogLevel.NO_LOG:
                break;
            case LogLevel.VERBOSE:
                break;
            case LogLevel.DEBUG:
                color = colors.cyan;
                break;
            case LogLevel.INFO:
                color = colors.green;
                break;
            case LogLevel.WARNING:
                color = colors.yellow;
                break;
            case LogLevel.ERROR:
                color = colors.red;
                break;
            case LogLevel.CRITICAL:
                color = colors.red;
                break;
        }
        console.log(color(line));
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