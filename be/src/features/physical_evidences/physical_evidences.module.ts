import { Module } from '@nestjs/common';
import { PhysicalEvidencesService } from './physical_evidences.service';
import { PhysicalEvidencesController } from './physical_evidences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalEvidence } from './entities/physical_evidence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalEvidence])],
  controllers: [PhysicalEvidencesController],
  providers: [PhysicalEvidencesService],
})
export class PhysicalEvidencesModule {}
