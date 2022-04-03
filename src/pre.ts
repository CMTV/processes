import chalk from "chalk";

export default function pre(color: string, type: 'solid' | 'dotted')
{
    return chalk[color](type === 'solid' ? '█' : '▒') + ' ';
}