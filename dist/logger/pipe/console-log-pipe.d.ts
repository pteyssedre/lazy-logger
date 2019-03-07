import { LogLevel } from '../log-level';
export interface LoggerPipe {
    log(level: LogLevel, data: any[]): void;
}
export declare class ConsoleLogPipe implements LoggerPipe {
    private formatLine;
    log(level: LogLevel, data: any[]): void;
}
