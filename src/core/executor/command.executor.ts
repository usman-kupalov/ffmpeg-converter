import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handler/stream.logger.interface';
import { ICommandExecute } from './command.types';

abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) { }

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processSpawn(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommandExecute;
  protected abstract spawn(command: ICommandExecute): ChildProcessWithoutNullStreams;
  protected abstract processSpawn(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}

export { CommandExecutor }; 
