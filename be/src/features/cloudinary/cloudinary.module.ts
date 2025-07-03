import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';
import { FileUploadService } from './file-upload.service';
import { CloudinaryController } from './cloudinary.controller';
import { UploadHelperService } from './upload-helper.service';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, FileUploadService, UploadHelperService],
  exports: [CloudinaryService, FileUploadService, UploadHelperService],
})
export class CloudinaryModule {} 