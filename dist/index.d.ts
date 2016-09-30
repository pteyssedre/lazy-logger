export declare enum LogLevel {
    VERBOSE = 32,
    DEBUG = 16,
    INFO = 8,
    WARNING = 4,
    ERROR = 2,
    CRITICAL = 1,
    NO_LOG = -1,
}
export declare class Logger {
    private level;
    private separator;
    constructor(level?: LogLevel);
    private formatLine(args);
    private log(level, any);
    v(...any: any[]): void;
    i(...any: any[]): void;
    d(...any: any[]): void;
    w(...any: any[]): void;
    e(...any: any[]): void;
    c(...any: any[]): void;
}
