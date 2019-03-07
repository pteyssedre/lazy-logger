// import { LoggerPipe } from './pipe/console-log-pipe';
// import { LogLevel } from './log-level';
// import { Logger } from "../index";
//
// export class MainLogger {
//
//     public queue: any[];
//     private readonly config: {[key: string]: Logger};
//     private pipes: LoggerPipe[];
//
//     constructor(private level: LogLevel){
//         this.queue = [];
//         this.pipes = [];
//         this.config = {};
//     }
//
//     use(pipe: LoggerPipe) {
//         this.pipes.push(pipe);
//     }
//
//     register(logger: Logger){
//         this.config[logger.options.class] = logger;
//         logger.options.level = this.level;
//         const origin = logger.push;
//         logger.push = (entry => {
//             this.push(entry);
//             origin.call(logger, entry);
//         });
//     }
//
//     push(data: LogEntry){
//         this.queue.push(data);
//         this.pipe(data);
//     }
//
//     pipe(data: LogEntry){
//         this.pipes.forEach(pipe => {
//             pipe.log(data)
//         })
//     }
// }