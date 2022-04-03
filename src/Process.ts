import chalk from "chalk";

import pre from "src/pre";

export abstract class Process
{
    abstract name: (() => string) | string;
    abstract process(): void | Promise<void>;
    abstract run(): void;

    showStart: boolean;
    
    protected stage: string;
    protected beginTime: number;

    getName()
    {
        if (!this.name)
            return this.constructor.name;

        return (typeof this.name === 'string' ? this.name : this.name());
    }

    protected fail(e)
    {
        throw e;
    }

    protected printStart()
    {
        console.log(pre('yellow', 'solid') + this.getName());
        console.log(pre('yellow', 'solid') + chalk.gray('Process started...'));
        console.log();
    }

    protected printCompleted()
    {
        let endTime = Date.now();

        console.log(pre('green', 'solid') + this.getName());
        console.log(pre('green', 'solid') + chalk.gray(`Process completed in ${endTime - this.beginTime}ms`));
        console.log();
    }

    protected printFailed()
    {
        let endTime = Date.now();

        console.log(pre('red', 'solid') + this.getName());

        if (this.stage)
            console.log(pre('red', 'solid') + chalk.gray('Stage:') + ' ' + this.stage);

        console.log(pre('red', 'solid') + chalk.gray(`Process failed in ${endTime - this.beginTime}ms`));
        console.log();
    }

    protected log(message: any)
    {
        console.log(pre('yellow', 'dotted') + this.getName());

        if (this.stage)
            console.log(pre('yellow', 'dotted') + chalk.gray('Stage:') + ' ' + this.stage);

        console.log(pre('yellow', 'dotted') + chalk.gray('Process log:'));
        console.log();
        console.log(message);
        console.log();
    }
}

export abstract class SyncProcess extends Process
{
    abstract process(): void;

    run()
    {
        this.beginTime = Date.now();

        if (this.showStart)
            this.printStart();

        try
        {
            this.process();
            this.printCompleted();
        }
        catch (e)
        {
            this.printFailed();
            this.fail(e);
        }

        this.stage = this.beginTime = undefined;
    }
}

export abstract class AsyncProcess extends Process
{
    abstract process(): Promise<void>;

    async run()
    {
        this.beginTime = Date.now();
        
        if (this.showStart)
            this.printStart();

        try
        {
            await Promise.resolve(this.process());
            this.printCompleted();
        }
        catch (e)
        {
            this.printFailed();
            this.fail(e);
        }

        this.stage = this.beginTime = undefined;
    }
}