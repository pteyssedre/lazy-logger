import { LogLevel } from './logger/log-level';
import { LoggerPipe } from './logger/pipe/console-log-pipe';
import { LogOptions } from "./logger/log-options";
export { LogOptions } from "./logger/log-options";
export { LoggerPipe } from './logger/pipe/console-log-pipe';
export { LogLevel } from './logger/log-level';
export declare class Logger {
    private scope?;
    private queue;
    readonly options: LogOptions;
    constructor(options?: LogOptions, scope?: string);
    push(level: LogLevel, data: any[]): void;
    use(pipe: LoggerPipe): void;
    v(...any: any[]): void;
    i(...any: any[]): void;
    d(...any: any[]): void;
    w(...any: any[]): void;
    e(...any: any[]): void;
    c(...any: any[]): void;
    flushQueue(start?: number, end?: number): any[];
    private isEnabled;
    private readonly currentTime;
    private log;
}
