import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evidence } from './entities/evidence.entity';
import { EvidenceService } from './evidences.service';
import { EvidenceController } from './evidences.controller';
import { UploadModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Evidence]), UploadModule],
  controllers: [EvidenceController],
  providers: [EvidenceService],
  exports: [EvidenceService],
})
export class EvidenceModule {}
