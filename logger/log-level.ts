
export enum LogLevel {
    DEBUG = 1 << 0,
    INFO = 1 << 1,
    WARNING = 1 << 2,
    ERROR = 1 << 3,
    CRITICAL = 1 << 4,
    VERBOSE = 0xFF,
    NO_LOG = -1
}