import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Case } from './entities/case.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalEvidence } from '../physical_evidences/entities/physical_evidence.entity';
import { SceneMedia } from '../scene_medias/entities/scene_media.entity';
import { InitialStatement } from '../initial_statements/entities/initial_statement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Case,
      PhysicalEvidence,
      SceneMedia,
      InitialStatement,
    ]),
  ],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
