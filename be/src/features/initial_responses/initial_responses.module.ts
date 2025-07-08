import { Module } from '@nestjs/common';
import { InitialResponsesService } from './initial_responses.service';
import { InitialResponsesController } from './initial_responses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitialResponse } from './entities/initial_response.entity';
import { PreservationMeasuresModule } from '../preservation_measures/preservation_measures.module';
import { MedicalSupportsModule } from '../medical_supports/medical_supports.module';

@Module({
  imports: [TypeOrmModule.forFeature([InitialResponse]), PreservationMeasuresModule, MedicalSupportsModule],
  controllers: [InitialResponsesController],
  providers: [InitialResponsesService],
})
export class InitialResponsesModule {}
