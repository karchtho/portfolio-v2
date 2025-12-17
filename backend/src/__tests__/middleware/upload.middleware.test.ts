import fs from 'fs/promises';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { deleteFile,sanitizeFilename, verifyFileType } from '../../middleware/uploads.middleware';

describe('Upload Middleware Utilities', () => {
  describe('sanitizeFilename', () => {
    it('should remove path separators', () => {
      expect(sanitizeFilename('../../../etc/passwd')).toBe('passwd');
      expect(sanitizeFilename('subdir/file.jpg')).toBe('file.jpg');
      expect(sanitizeFilename('../../../../malicious.exe')).toBe('malicious.exe');
    });

    it('should keep only safe characters', () => {
      expect(sanitizeFilename('my file!@#$%^&*().jpg')).toBe('my_file__________.jpg');
    });

    it('should preserve extension', () => {
      expect(sanitizeFilename('test.jpg')).toBe('test.jpg');
      expect(sanitizeFilename('image.png')).toBe('image.png');
    });

    it('should handle filenames with hyphens and underscores', () => {
      expect(sanitizeFilename('my-file_name.webp')).toBe('my-file_name.webp');
    });
  });

  describe('deleteFile', () => {
    const testFilePath = path.join(__dirname, '../../uploads/projects/test-delete.txt');

    beforeEach(async () => {
      // Create test file
      await fs.mkdir(path.dirname(testFilePath), { recursive: true });
      await fs.writeFile(testFilePath, 'test content');
    });

    afterEach(async () => {
      // Cleanup - try to delete if still exists
      try {
        await fs.unlink(testFilePath);
      } catch {
        // Ignore if already deleted
      }
    });

    it('should delete existing file', async () => {
      await deleteFile(testFilePath);

      // Verify file no longer exists
      await expect(fs.access(testFilePath)).rejects.toThrow();
    });

    it('should not throw error for non-existent file', async () => {
      const nonExistentPath = path.join(__dirname, '../../uploads/projects/does-not-exist.txt');

      // Should not throw
      await expect(deleteFile(nonExistentPath)).resolves.toBeUndefined();
    });
  });

  describe('verifyFileType', () => {
    const uploadsDir = path.join(__dirname, '../../uploads/projects');

    beforeEach(async () => {
      await fs.mkdir(uploadsDir, { recursive: true });
    });

    it('should return false for non-existent file', async () => {
      const result = await verifyFileType(path.join(uploadsDir, 'does-not-exist.jpg'));
      expect(result).toBe(false);
    });

    it('should return false for text file with .jpg extension', async () => {
      // Create fake image (text file with .jpg extension)
      const fakeImagePath = path.join(uploadsDir, 'fake.jpg');
      await fs.writeFile(fakeImagePath, 'This is not a real image');

      const result = await verifyFileType(fakeImagePath);
      expect(result).toBe(false);

      // Cleanup
      await fs.unlink(fakeImagePath);
    });

    // Note: Testing with real images would require test fixtures
    // For now, we verify that the function handles invalid cases correctly
  });
});
