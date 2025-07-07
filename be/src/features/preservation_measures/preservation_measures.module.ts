import { Module } from '@nestjs/common';
import { PreservationMeasuresService } from './preservation_measures.service';
import { PreservationMeasuresController } from './preservation_measures.controller';

@Module({
  controllers: [PreservationMeasuresController],
  providers: [PreservationMeasuresService],
})
export class PreservationMeasuresModule {}
