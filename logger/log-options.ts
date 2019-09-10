import {LogLevel} from "./log-level";
import {ConsoleLogPipe, LoggerPipe} from "./pipe/console-log-pipe";

export class LogOptions {
    public class?: string;
    public level?: LogLevel;
    public tags?: string[];
    public pipes?: LoggerPipe[];
    public separator?: string;

    constructor(klass?: string,
                level: LogLevel = LogLevel.VERBOSE,
                tags: string[] = [],
                pipes: LoggerPipe[] = [],
                separator: string = "[@]") {
        this.class = klass;
        this.level = level;
        this.tags = tags;
        this.separator = separator;
        this.pipes = pipes;
    }

    static enhanceOptions(options?: LogOptions) {
        let opts = new LogOptions();
        if (!options) {
            options = opts;
            return opts;
        }
        const defaults = Object.keys(opts);
        const presents = Object.keys(options);
        const missing = defaults.filter(key => presents.indexOf(key) === -1);
        for (const key of missing) {
            options[key] = opts[key];
        }
        return options;
    }
}
