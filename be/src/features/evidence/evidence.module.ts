import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evidence } from './entities/evidence.entity';
import { EvidenceService } from './evidence.service';
import { EvidenceController } from './evidence.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { EvidenceUploadService } from './evidence-upload.service';


@Module({
  imports: [TypeOrmModule.forFeature([Evidence]), CloudinaryModule],
  controllers: [EvidenceController],
  providers: [EvidenceService, EvidenceUploadService],
})
export class EvidenceModule {} 