import { Module } from '@nestjs/common';
import { SceneMediasService } from './scene_medias.service';
import { SceneMediasController } from './scene_medias.controller';

@Module({
  controllers: [SceneMediasController],
  providers: [SceneMediasService],
})
export class SceneMediasModule {}
