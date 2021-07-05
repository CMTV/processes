import * as chalk from 'chalk';

import { Process } from './Process';

export abstract class ProcessGroup
{
    abstract groupName(): string;
    abstract processes(): Process[];
    
    run()
    {
        console.log('\n' + chalk.black.bgCyan(' GROUP ') + ' ' + chalk.cyan(this.groupName()));
        this.processes().forEach(process => process.run());
        console.log('\n' + chalk.cyan('Group completed!'));
    }
}