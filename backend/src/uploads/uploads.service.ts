import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
  private readonly uploadsDir = path.join(process.cwd(), 'uploads', 'projects');

  async verifyFileType(filePath: string): Promise<boolean> {
    const { fileTypeFromFile } = await import('file-type');
    const type = await fileTypeFromFile(filePath);
    if (!type) return false;

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    return allowedMimes.includes(type.mime);
  }

  async processUploadedFiles(files: Express.Multer.File[]): Promise<{ paths: string[]; warning?: string }> {
    const validPaths: string[] = [];
    const rejected: string[] = [];

    for (const file of files) {
      const isValid = await this.verifyFileType(file.path);
      if (isValid) {
        validPaths.push(`uploads/projects/${file.filename}`);
      } else {
        // Delete invalid file
        fs.unlink(file.path, () => {});
        rejected.push(file.originalname);
      }
    }

    if (validPaths.length === 0 && rejected.length > 0) {
      throw new BadRequestException('All uploaded files failed validation');
    }

    const result: { paths: string[]; warning?: string } = { paths: validPaths };
    if (rejected.length > 0) {
      result.warning = `Some files were rejected: ${rejected.join(', ')}`;
    }
    return result;
  }

  deleteFile(filename: string): void {
    const sanitized = path.basename(filename);
    const filePath = path.resolve(this.uploadsDir, sanitized);

    // Path traversal protection
    if (!filePath.startsWith(this.uploadsDir)) {
      throw new BadRequestException('Invalid filename');
    }

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    fs.unlinkSync(filePath);
  }
}
