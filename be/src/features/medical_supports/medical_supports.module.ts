import { Module } from '@nestjs/common';
import { MedicalSupportsService } from './medical_supports.service';
import { MedicalSupportsController } from './medical_supports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalSupport } from './entities/medical_support.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalSupport])],
  controllers: [MedicalSupportsController],
  providers: [MedicalSupportsService],
  exports: [MedicalSupportsService]
})
export class MedicalSupportsModule {}
