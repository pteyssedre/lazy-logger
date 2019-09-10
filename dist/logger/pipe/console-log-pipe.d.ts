import { LogLevel } from '../log-level';
import { LogOptions } from "../log-options";
export interface LoggerPipe {
    log(level: LogLevel, data: any[]): void;
}
export declare class ConsoleLogPipe implements LoggerPipe {
    private options;
    constructor(options: LogOptions);
    private formatLine;
    log(level: LogLevel, data: any[]): void;
}
