import { Module } from '@nestjs/common';
import { PreservationMeasuresService } from './preservation_measures.service';
import { PreservationMeasuresController } from './preservation_measures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreservationMeasure } from './entities/preservation_measure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreservationMeasure])],
  controllers: [PreservationMeasuresController],
  providers: [PreservationMeasuresService],
  exports: [PreservationMeasuresService]
})
export class PreservationMeasuresModule {}
