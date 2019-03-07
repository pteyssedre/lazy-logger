import { LogLevel } from "./log-level";
import { LoggerPipe } from "./pipe/console-log-pipe";
export declare class LogOptions {
    class?: string;
    level?: LogLevel;
    tags?: string[];
    pipes?: LoggerPipe[];
    separator?: string;
    constructor(klass?: string, level?: LogLevel, tags?: string[], pipes?: LoggerPipe[], separator?: string);
    static enhanceOptions(options?: LogOptions): LogOptions;
}
