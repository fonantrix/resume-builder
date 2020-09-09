class Log {
    readonly logger: Console = console;
    private static instance: Log;

    static getInstance(): Log {
        if (!Log.instance) {
            Log.instance = new Log();
        }

        return Log.instance;
    }

    public trace(message: string, source: string): void {
        this.generateMessage('trace', message, source);
    }

    public info(message: string, source: string): void {
        this.generateMessage('info', message, source);
    }

    public warn(message: string, source: string): void {
        this.generateMessage('warn', message, source);
    }

    public error(message: string, source: string): void {
        this.generateMessage('error', message, source);
    }

    public debug(message: string, source: string): void {
        if (process.env.NODE_ENV === 'dev') this.generateMessage('error', message, source);
    }

    private generateMessage(level: keyof Console, message: string, source?: string): void {
        source
            ? this.logger[level](`${new Date().toLocaleTimeString()} [${source}]:`, message)
            : this.logger[level](`${new Date().toLocaleTimeString()}:`, message);
    }
}

export default Log.getInstance();