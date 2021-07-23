export declare abstract class Process {
    abstract processName(): string;
    abstract process(): void;
    stage: string;
    clearStage(): void;
    run(): void;
    static currentProcess: Process;
    static log(toLog?: any): void;
    static warning(toLog?: any): void;
}
