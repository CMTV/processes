import { Process } from './Process';
export declare abstract class ProcessGroup {
    abstract groupName(): string;
    abstract processes(): Process[];
    run(): void;
}
