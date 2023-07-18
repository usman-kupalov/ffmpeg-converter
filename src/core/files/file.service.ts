import { promises } from 'fs';
import { join, dirname, isAbsolute } from 'path';

class FileService {
  private async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, ext: string): string {
    if (!isAbsolute(path)) {
      return join(__dirname + '/' + path);
    }
    return join(dirname(path) + '/' + name + '.' + ext);
  }

  async deleteFile(path: string): Promise<void> {
    if (await this.isExist(path)) {
      promises.unlink(path);
    }
  }
}

export { FileService };
