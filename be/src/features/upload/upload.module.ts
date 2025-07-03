import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryModule } from 'src/provider/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
