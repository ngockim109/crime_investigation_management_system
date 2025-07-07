import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SceneMediasService } from './scene_medias.service';
import { CreateSceneMediaDto } from './dto/create-scene_media.dto';
import { UpdateSceneMediaDto } from './dto/update-scene_media.dto';

@Controller('scene-medias')
export class SceneMediasController {
  constructor(private readonly sceneMediasService: SceneMediasService) {}

  @Post()
  create(@Body() createSceneMediaDto: CreateSceneMediaDto) {
    return this.sceneMediasService.create(createSceneMediaDto);
  }

  @Get()
  findAll() {
    return this.sceneMediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sceneMediasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSceneMediaDto: UpdateSceneMediaDto) {
    return this.sceneMediasService.update(+id, updateSceneMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sceneMediasService.remove(+id);
  }
}
