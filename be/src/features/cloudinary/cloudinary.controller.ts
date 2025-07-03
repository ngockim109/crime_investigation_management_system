import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ResponseMessage } from 'src/decorator/customize';
import { Attachment } from '../evidence/interfaces/attachment.interface';
import { Multer } from 'multer';

@Controller('upload')
export class CloudinaryController {
  constructor(
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post('evidence')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadEvidenceFiles(
    @UploadedFiles() files: Multer.File[],
  ): Promise<Attachment[]> {
    
    return this.fileUploadService.uploadMultipleFiles(files, 'evidence');
  }
 } 