import moment = require('moment');
import {LogLevel} from './logger/log-level';
import {ConsoleLogPipe, LoggerPipe} from './logger/pipe/console-log-pipe';
import {LogOptions} from "./logger/log-options";

export {LogOptions} from "./logger/log-options";
export {LoggerPipe} from './logger/pipe/console-log-pipe';
export {LogLevel} from './logger/log-level';

export class Logger {

    private queue: any[];
    public readonly options: LogOptions;

    constructor(options?: LogOptions, private scope?: string) {
        this.options = LogOptions.enhanceOptions(options);
        if (!this.options.class && !this.scope) {
            this.options.class = this.constructor.name;
        }
        if (!this.options.pipes || this.options.pipes.length === 0) {
            this.options.pipes = [new ConsoleLogPipe(this.options)];
        }
        this.queue = [];
    }

    push(level: LogLevel, data: any[]) {
        this.queue.push({level, data});
        this.options.pipes.forEach(pipe => {
            pipe.log(level, data)
        });
    }

    use(pipe: LoggerPipe) {
        this.options.pipes.push(pipe);
    }

    public v(...any: any[]): void {
        this.log(LogLevel.VERBOSE, any);
    }

    public i(...any: any[]): void {
        this.log(LogLevel.INFO, any);
    }

    public d(...any: any[]): void {
        this.log(LogLevel.DEBUG, any);
    }

    public w(...any: any[]): void {
        this.log(LogLevel.WARNING, any);
    }

    public e(...any: any[]): void {
        this.log(LogLevel.ERROR, any);
    }

    public c(...any: any[]): void {
        this.log(LogLevel.CRITICAL, any);
    }

    flushQueue(start?: number, end?: number): any[] {
        if (isNaN(start)) {
            start = 0;
        }
        if (isNaN(end)) {
            end = this.queue.length;
        }
        return this.queue.slice(start, end);
    }

    private isEnabled(logLevel: LogLevel) {
        if (this.options.level == LogLevel.NO_LOG) {
            return false;
        }
        return (this.options.level & logLevel) === logLevel || (this.options.level <= logLevel);
    }

    private get currentTime(): string {
        return moment(new Date()).utc().format('YYYY-MM-DDTHH:mm:ss.SSSSSSSZ');
    }

    private log(level: LogLevel, any: any[]): void {
        if (this.isEnabled(level)) {
            let data = [];
            data.push(this.currentTime);
            if (this.scope)
                data.push(this.scope);
            else if (!this.scope && this.options.class)
                data.push(this.options.class);
            data.push(...any);
            this.push(level, data);
        }
    }
}
