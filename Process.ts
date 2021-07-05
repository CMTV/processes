import chalk from 'chalk';

export abstract class Process
{
    abstract processName(): string;
    abstract process(): void;

    stage: string;
    clearStage() { this.stage = null; }

    run()
    {
        Process.currentProcess = this;

        let beginTime = Date.now();

        console.log('\n' + chalk.bold(this.processName(), '...'));

        try { this.process(); }
        catch (e)
        {
            console.log('❌', ' ' + chalk.bold.red('Error!') + (this.stage ? chalk.red(' Stage: ') + chalk.bold.red(this.stage) : ''));
            throw new Error(e.stack);
        }

        let endTime = Date.now();

        console.log('✔️', ' ' + chalk.bold.green('Ready!') + ' ' + chalk.grey((endTime - beginTime) + 'ms'));
    }

    //
    // STATIC
    //

    static currentProcess: Process;

    static log(toLog: any = null)
    {
        if (!this.currentProcess) return;

        console.log('\n💬', ' ' + chalk.bold('Log') + (this.currentProcess.stage ? ' Stage: ' + chalk.bold(this.currentProcess.stage) : ''));
        if (toLog) console.log(toLog, '\n');
    }

    static warning(toLog: any = null)
    {
        if (!this.currentProcess) return;

        console.log('\n⚠️', ' ' + chalk.bold.yellow('Warning!') + (this.currentProcess.stage ? chalk.yellow(' Stage: ') + chalk.bold.yellow(this.currentProcess.stage) : ''));
        if (toLog) console.log(toLog, '\n');
    }
}

class Test extends Process
{
    processName() { return 'Looool'; }

    process()
    {

    }
}

(new Test).run();