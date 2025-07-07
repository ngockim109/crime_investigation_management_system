import { Module } from '@nestjs/common';
import { MedicalSupportsService } from './medical_supports.service';
import { MedicalSupportsController } from './medical_supports.controller';

@Module({
  controllers: [MedicalSupportsController],
  providers: [MedicalSupportsService],
})
export class MedicalSupportsModule {}
