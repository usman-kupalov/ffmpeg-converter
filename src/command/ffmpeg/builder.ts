class FfmpegBuilder {
  private inputPath: string;
  private options: Map<string, string> = new Map();

  constructor() {
    this.options.set('-c:v', 'libx264');
  }

  input(inputPath: string): this {
    this.inputPath = inputPath;
    return this;
  }

  setVideoSize(width: number, heigth: number): this {
    this.options.set('-s', `${width}x${heigth}`);
    return this;
  }

  output(outputPath: string): string[] {
    if (!this.inputPath) {
      throw new Error('Input parameter not setted');
    }
    const args: string[] = ['-i', this.inputPath];
    console.log(args);
    this.options.forEach((value, key) => {
      args.push(key);
      args.push(value);
    });
    args.push(outputPath);
    console.log(args);
    return args;
  }
}

export { FfmpegBuilder };
