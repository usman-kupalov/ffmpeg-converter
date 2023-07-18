import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { IStreamLogger } from '../../core/handler/stream.logger.interface';
import { ICommandExecFfmpeg, IFfmpegInput } from './ffmpeg.types';
import { FileService } from '../../core/files/file.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { FfmpegBuilder } from './builder';
import { StreamHandler } from '../../core/handler/stream.handler';

class FfmpegExecutor extends CommandExecutor<IFfmpegInput>{
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>('Width', 'number');
    const heigth = await this.promptService.input<number>('Heigth', 'number');
    const path = await this.promptService.input<string>('Path to file', 'input');
    const name = await this.promptService.input<string>('Filename', 'input');
    return { width, heigth, path, name };
  }

  protected build({ width, heigth, path, name }: IFfmpegInput): ICommandExecFfmpeg {
    const output = this.fileService.getFilePath(path, name, 'mp4');
    const args = (new FfmpegBuilder)
      .input(path)
      .setVideoSize(width, heigth)
      .output(output);
    return { command: 'ffmpeg', args, output };
  }

  protected spawn({ output, command, args }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFile(output);
    return spawn(command, args);
  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}

export { FfmpegExecutor };
