import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SceneMedia } from './entities/scene_media.entity';
import { CreateSceneMediaDto } from './dto/create-scene_media.dto';
import { UpdateSceneMediaDto } from './dto/update-scene_media.dto';

@Injectable()
export class SceneMediasService {
  private readonly logger = new Logger(SceneMediasService.name);

  constructor(
    @InjectRepository(SceneMedia)
    private readonly sceneMediaRepository: Repository<SceneMedia>,
  ) {}

  async createSceneMedias(createSceneMediaDto: CreateSceneMediaDto) {
    try {
      const entity = this.sceneMediaRepository.create(createSceneMediaDto);
      const saved = await this.sceneMediaRepository.save(entity);
      this.logger.log(`Created scene media with id: ${saved.scene_media_id}`);
      return saved;
    } catch (error) {
      this.logger.error('Error creating scene media', error.stack);
      throw error;
    }
  }

  async findAllSceneMedias() {
    try {
      const result = await this.sceneMediaRepository.find({ where: { is_deleted: false } });
      this.logger.log(`Fetched ${result.length} scene medias`);
      return result;
    } catch (error) {
      this.logger.error('Error fetching scene medias', error.stack);
      throw error;
    }
  }

  async findOneSceneMedias(id: string) {
    try {
      const result = await this.sceneMediaRepository.findOne({ where: { scene_media_id: id, is_deleted: false } });
      if (!result) this.logger.warn(`Scene media not found with id: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error fetching scene media with id: ${id}`, error.stack);
      throw error;
    }
  }

  async updateSceneMedias(id: string, updateSceneMediaDto: UpdateSceneMediaDto) {
    try {
      await this.sceneMediaRepository.update(id, updateSceneMediaDto);
      const updated = await this.sceneMediaRepository.findOne({ where: { scene_media_id: id } });
      this.logger.log(`Updated scene media with id: ${id}`);
      return updated;
    } catch (error) {
      this.logger.error(`Error updating scene media with id: ${id}`, error.stack);
      throw error;
    }
  }

  async removeSceneMedias(id: string) {
    try {
      await this.sceneMediaRepository.update(id, { is_deleted: true });
      this.logger.log(`Soft deleted scene media with id: ${id}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Error deleting scene media with id: ${id}`, error.stack);
      throw error;
    }
  }

  async findByCaseId(case_id: string) {
    try {
      const result = await this.sceneMediaRepository.find({
        where: { case_id, is_deleted: false },
        order: { date_taken: 'ASC' },
      });
      return result.map((item, idx) => ({
        id: item.scene_media_id,
        scene_media_file: item.scene_media_file,
        description: item.scene_media_description,
        date: item.date_taken,
      }));
    } catch (error) {
      this.logger.error('Error fetching scene medias by case_id', error.stack);
      throw error;
    }
  }
}
