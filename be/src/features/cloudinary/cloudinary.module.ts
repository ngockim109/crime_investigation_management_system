import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';
import { FileUploadService } from './file-upload.service';
import { CloudinaryController } from './cloudinary.controller';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService, FileUploadService],
  exports: [CloudinaryService, FileUploadService],
})
export class CloudinaryModule {} 