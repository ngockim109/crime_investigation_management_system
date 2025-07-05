import { Injectable } from '@nestjs/common';
import { CreateSceneMediaDto } from './dto/create-scene_media.dto';
import { UpdateSceneMediaDto } from './dto/update-scene_media.dto';

@Injectable()
export class SceneMediasService {
  create(createSceneMediaDto: CreateSceneMediaDto) {
    return 'This action adds a new sceneMedia';
  }

  findAll() {
    return `This action returns all sceneMedias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sceneMedia`;
  }

  update(id: number, updateSceneMediaDto: UpdateSceneMediaDto) {
    return `This action updates a #${id} sceneMedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} sceneMedia`;
  }
}
