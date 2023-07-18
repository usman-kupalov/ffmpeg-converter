import { FfmpegExecutor } from './command/ffmpeg/ffmpeg.executor';
import { ConsoleLogger } from './out/console-logger';

class App {
  async run() {
    new FfmpegExecutor(ConsoleLogger.getIntstance()).execute();
  }
}

const app = new App();
app.run();