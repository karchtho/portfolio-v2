import crypto from 'crypto';
import { Request } from 'express';
import { fileTypeFromFile } from 'file-type';
import fs from 'fs/promises';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

/**
 * Allowed image MIME types for security validation
 */
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Allowed file extensions
 */
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/**
 * Max file size: 5MB
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Storage configuration for projects images
 * Files are saved to uploads/projects/ with UUID-based filenames
 */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // Upload path relative to backend root
    const uploadPath = path.join(__dirname, '../../uploads/projects');
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    // Generate unique filename: {uuid}{extension}
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${crypto.randomUUID()}${ext}`;
    cb(null, filename);
  },
});

/**
 * File filter for initial validation (MIME type + extension)
 * Note: This is NOT sufficient for security - we also verify magic bytes after upload
 */
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  try {
    // 1. Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return cb(new Error(`Invalid file extension. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`));
    }

    // 2. Check declared MIME type (from client)
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error(`Invalid MIME type? Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`));
    }

    // Accept file (magic bytes verification happens in route handler)
    cb(null, true);
  } catch (error) {
    cb(error as Error);
  }
};

/**
 * Multer upload middleware for projects images
 * Configured for up to 10 files per request, max 5MB each
 */
export const uploadsProjectImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10,
  },
});

/**
 * Verify uploaded file type using magic bytes (file signature)
 * This is a critical security check to prevent malicious files disguised with fake extensions
 *
 * @param filePath - Absolute path to the uploaded file
 * @returns true if file type is allowed, false otherwise
 */
export async function verifyFileType(filePath: string): Promise<boolean> {
  try {
    const type = await fileTypeFromFile(filePath);
    if (!type) {
      // Files couldn't be determined (might be corrupted)
      return false;
    }
    return ALLOWED_MIME_TYPES.includes(type.mime);
  } catch {
    return false;
  }
}

/**
 * Sanitize filename to prevent path traversal attacks
 * Removes any directory separators and keeps only safe characters
 *
 * @param filename - Original filename from request
 * @returns Sanitized filename (basename only)
 */
export function sanitizeFilename(filename: string): string {
  return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
}

  /**
   * Delete uploaded file (used for cleanup after failed validation)
   *
   * @param filePath - Absolute path to the file to delete
   */
export async function deleteFile(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch {
    // File might not exist or already deleted - ignore error
  }
}
