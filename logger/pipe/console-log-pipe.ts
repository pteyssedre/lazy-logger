import circular = require('circular-json');
import colors = require('colors');
import {LogLevel} from '../log-level';
import {LogOptions} from "../log-options";

export interface LoggerPipe {
    log(level: LogLevel, data: any[]): void;
}

enum LogLevelText {
    VER = 0xFF,
    DEB = 1 << 0,
    INF = 1 << 1,
    WAR = 1 << 2,
    ERR = 1 << 3,
    CRI = 1 << 4,
    NOL = -1
}

export class ConsoleLogPipe implements LoggerPipe {

    constructor(private options: LogOptions) {
    }


    private formatLine(level: LogLevel, args: any[]): string {
        const ba = this.options.separator.split('@');
        let b = ba[0];
        let a = ba[1];
        let line = b + LogLevelText[level] + a;
        for (let i = 0; i < args.length; i++) {
            let str = "";
            let item = args[i];
            switch ((typeof item).toLowerCase()) {
                case "function":
                    let tr = b + item;
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
    }

    log(level: LogLevel, data: any[]) {
        let line = this.formatLine(level, data);
        let color = colors.gray;
        switch (level) {
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
}
