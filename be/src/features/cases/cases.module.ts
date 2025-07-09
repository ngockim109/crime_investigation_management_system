import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { SceneMediasModule } from '../scene_medias/scene_medias.module';
import { InitialStatementsModule } from '../initial_statements/initial_statements.module';
import { PhysicalEvidencesModule } from '../physical_evidences/physical_evidences.module';

@Module({
  imports: [SceneMediasModule, InitialStatementsModule, PhysicalEvidencesModule],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
