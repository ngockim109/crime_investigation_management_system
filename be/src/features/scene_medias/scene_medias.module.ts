import { Module } from '@nestjs/common';
import { SceneMediasService } from './scene_medias.service';
import { SceneMediasController } from './scene_medias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SceneMedia } from './entities/scene_media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SceneMedia])],
  controllers: [SceneMediasController],
  providers: [SceneMediasService],
})
export class SceneMediasModule {}
