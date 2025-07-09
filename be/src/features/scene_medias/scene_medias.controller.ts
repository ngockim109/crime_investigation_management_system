import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SceneMediasService } from './scene_medias.service';
import { CreateSceneMediaDto } from './dto/create-scene_media.dto';
import { UpdateSceneMediaDto } from './dto/update-scene_media.dto';

@Controller('scene-medias')
export class SceneMediasController {
  constructor(private readonly sceneMediasService: SceneMediasService) {}

  @Post()
  createSceneMedias(@Body() createSceneMediaDto: CreateSceneMediaDto) {
    return this.sceneMediasService.createSceneMedias(createSceneMediaDto);
  }

  @Get()
  findAllSceneMedias() {
    return this.sceneMediasService.findAllSceneMedias();
  }

  @Get(':id')
  findOneSceneMedias(@Param('id') id: string) {
    return this.sceneMediasService.findOneSceneMedias(id);
  }

  @Patch(':id')
  updateSceneMedias(@Param('id') id: string, @Body() updateSceneMediaDto: UpdateSceneMediaDto) {
    return this.sceneMediasService.updateSceneMedias(id, updateSceneMediaDto);
  }

  @Delete(':id')
  removeSceneMedias(@Param('id') id: string) {
    return this.sceneMediasService.removeSceneMedias(id);
  }
}
