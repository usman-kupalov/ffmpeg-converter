import { IStreamLogger } from '../core/handler/stream.logger.interface';

class ConsoleLogger implements IStreamLogger {
  private static logger: ConsoleLogger;
  public static getIntstance() {
    if (!ConsoleLogger.logger) {
      ConsoleLogger.logger = new ConsoleLogger();
    }
    return ConsoleLogger.logger;
  }

  log(...args: any[]): void {
    console.log(...args);
  }
  error(...args: any[]): void {
    console.log(...args);
  }
  end(): void {
    console.log('Ready');
  }

}

export { ConsoleLogger };
