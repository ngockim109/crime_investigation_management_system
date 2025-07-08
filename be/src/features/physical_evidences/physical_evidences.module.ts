import { Module } from '@nestjs/common';
import { PhysicalEvidencesService } from './physical_evidences.service';
import { PhysicalEvidencesController } from './physical_evidences.controller';
import { PhysicalEvidence } from './entities/physical_evidence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from '../cases/entities/case.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalEvidence, Case, User])],
  controllers: [PhysicalEvidencesController],
  providers: [PhysicalEvidencesService],
})
export class PhysicalEvidencesModule {}
