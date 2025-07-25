import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Case } from './entities/case.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicalEvidence } from '../physical_evidences/entities/physical_evidence.entity';
import { SceneMedia } from '../scene_medias/entities/scene_media.entity';
import { InitialStatement } from '../initial_statements/entities/initial_statement.entity';
import { SceneMediasModule } from '../scene_medias/scene_medias.module';
import { InitialStatementsModule } from '../initial_statements/initial_statements.module';
import { PhysicalEvidencesModule } from '../physical_evidences/physical_evidences.module';
import { Report } from '../reports/entities/report.entity';

@Module({
  imports: [
    SceneMediasModule,
    InitialStatementsModule,
    PhysicalEvidencesModule,
    TypeOrmModule.forFeature([
      Case,
      Report,
      PhysicalEvidence,
      SceneMedia,
      InitialStatement,
    ]),
    SceneMediasModule,
    InitialStatementsModule,
    PhysicalEvidencesModule,
  ],
  controllers: [CasesController],
  providers: [CasesService],
  exports: [CasesService],
})
export class CasesModule {}
