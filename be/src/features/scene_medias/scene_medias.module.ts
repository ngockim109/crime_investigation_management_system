import { Module } from '@nestjs/common';
import { SceneMediasService } from './scene_medias.service';
import { SceneMediasController } from './scene_medias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from '../cases/entities/case.entity';
import { SceneMedia } from './entities/scene_media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Case, SceneMedia])],
  controllers: [SceneMediasController],
  providers: [SceneMediasService],
})
export class SceneMediasModule {}
