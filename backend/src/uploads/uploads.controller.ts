import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard } from '../auth/auth.guard';
import { UploadsService } from './uploads.service';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

@Controller('api/upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('projects')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
          return cb(new Error(`File extension ${ext} not allowed`), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadsService.processUploadedFiles(files);
  }

  @Delete('projects/:filename')
  @UseGuards(JwtAuthGuard)
  deleteImage(@Param('filename') filename: string) {
    this.uploadsService.deleteFile(filename);
    return { success: true, message: 'File deleted' };
  }
}
