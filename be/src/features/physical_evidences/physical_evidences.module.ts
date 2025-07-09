import { Module } from '@nestjs/common';
import { PhysicalEvidencesService } from './physical_evidences.service';
import { PhysicalEvidencesController } from './physical_evidences.controller';

@Module({
  controllers: [PhysicalEvidencesController],
  providers: [PhysicalEvidencesService],
  exports: [PhysicalEvidencesService],
})
export class PhysicalEvidencesModule {}
