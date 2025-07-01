import { Injectable } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { Attachment } from '../evidence/interfaces/attachment.interface';
import { Multer } from 'multer';

@Injectable()
export class UploadHelperService {
  constructor(private readonly fileUploadService: FileUploadService) {}
  /**
   * Upload multiple files và trả về array URLs
   */
  async uploadMultipleFiles(files: Multer.File[], folder: string = 'default'): Promise<Attachment[]> {
    return this.fileUploadService.uploadMultipleFiles(files, folder);
  }

  /**
   * Upload evidence files
   */
  async uploadEvidenceFiles(files: Multer.File[]): Promise<Attachment[]> {
    return this.uploadMultipleFiles(files, 'evidence');
  }
} 