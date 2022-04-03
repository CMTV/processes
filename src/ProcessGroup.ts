import chalk from "chalk";

import { Process, SyncProcess } from "src/Process";
import pre from "src/pre";

export abstract class ProcessGroup
{
    abstract groupName: (() => string) | string;
    abstract processes(): Process[];
    abstract run(): void;

    protected beginTime: number;

    getGroupName()
    {
        if (!this.groupName)
            return this.constructor.name;

        return (typeof this.groupName === 'string' ? this.groupName : this.groupName());
    }

    protected printStart()
    {
        console.log(pre('cyan', 'solid') + this.getGroupName());
        console.log(pre('cyan', 'solid') + chalk.gray('Process group started...'));
        console.log();
    }

    protected printCompleted()
    {
        let endTime = Date.now();

        console.log(pre('cyan', 'dotted') + this.getGroupName());
        console.log(pre('cyan', 'dotted') + chalk.gray(`Process group completed in ${endTime - this.beginTime}ms`));
        console.log();
    }
}

export abstract class SyncProcessGroup extends ProcessGroup
{
    abstract processes(): SyncProcess[];

    run()
    {
        this.beginTime = Date.now();
        this.printStart();
        this.processes().forEach(process => process.run());
        this.printCompleted();
        this.beginTime = undefined;
    }
}

export abstract class AsyncProcessGroup extends ProcessGroup
{
    async run()
    {
        this.beginTime = Date.now();
        this.printStart();

        let processes = this.processes();

        for (let i = 0; i < processes.length; i++)
            await processes[i].run();

        this.printCompleted();
        this.beginTime = undefined;
    }
}