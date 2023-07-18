import { ICommandExecute } from '../../core/executor/command.types';

interface IFfmpegInput {
  width: number;
  heigth: number;
  path: string;
  name: string;
}

interface ICommandExecFfmpeg extends ICommandExecute {
  output: string;
}

export { IFfmpegInput, ICommandExecFfmpeg };
