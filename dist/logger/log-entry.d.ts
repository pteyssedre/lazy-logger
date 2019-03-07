export interface LogEntry {
    date: string;
    level: string;
    kClass: string;
    message: string;
    data: any;
    tags: string[];
}
