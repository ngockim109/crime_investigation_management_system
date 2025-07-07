import { PartialType } from '@nestjs/mapped-types';
import { CreateSceneMediaDto } from './create-scene_media.dto';

export class UpdateSceneMediaDto extends PartialType(CreateSceneMediaDto) {}
