import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { SceneMedia } from './entities/scene_media.entity';
import { CreateSceneMediaDto } from './dto/create-scene_media.dto';
import { UpdateSceneMediaDto } from './dto/update-scene_media.dto';
import { GetSceneMediasFilterDto } from './dto/get-scene-medias-filter.dto';

export interface PaginatedSceneMediasResult {
  data: SceneMedia[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


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

  async findAllSceneMedias(
    filterDto: GetSceneMediasFilterDto,
  ): Promise<PaginatedSceneMediasResult> {
    try {
      this.logger.log('Filter DTO received:', JSON.stringify(filterDto));

      const {
        scene_media_description,
        captured_by,
        case_id,
        date_from,
        date_to,
        page = '1',
        limit = '10',
      } = filterDto;

      const queryBuilder = this.sceneMediaRepository
        .createQueryBuilder('scene_media')
        .leftJoinAndSelect('scene_media.captured_by_user', 'captured_by_user')
        .leftJoinAndSelect('scene_media.case', 'case')
        .where('scene_media.is_deleted = :isDeleted', {
          isDeleted: false,
        });

      // Add filters if they have actual values (not empty strings)
      if (scene_media_description && scene_media_description.toString().trim() !== '') {
        queryBuilder.andWhere('scene_media.scene_media_description LIKE :desc', {
          desc: `%${scene_media_description}%`,
        });
        this.logger.log(`Added scene_media_description filter: ${scene_media_description}`);
      }

      if (captured_by && captured_by.toString().trim() !== '') {
        queryBuilder.andWhere('captured_by_user.username = :capturedBy', {
          capturedBy: captured_by,
        });
        this.logger.log(`Added captured_by filter: ${captured_by}`);
      }

      if (case_id && case_id.toString().trim() !== '') {
        queryBuilder.andWhere('scene_media.case_id = :caseId', {
          caseId: case_id,
        });
        this.logger.log(`Added case_id filter: ${case_id}`);
      }

      if (
        date_from &&
        date_from.toString().trim() !== '' &&
        date_to &&
        date_to.toString().trim() !== ''
      ) {
        queryBuilder.andWhere(
          'scene_media.date_taken BETWEEN :from AND :to',
          {
            from: new Date(date_from.toString()),
            to: new Date(date_to.toString()),
          },
        );
        this.logger.log(`Added date range filter: ${date_from} to ${date_to}`);
      }

      const pageNumber = Math.max(1, Number.parseInt(page.toString()) || 1);
      const limitNumber = Math.max(
        1,
        Math.min(100, Number.parseInt(limit.toString()) || 10),
      );
      const skip = (pageNumber - 1) * limitNumber;

      queryBuilder.skip(skip).take(limitNumber);
      queryBuilder.orderBy('scene_media.date_taken', 'DESC');

      this.logger.log(`Query: ${queryBuilder.getQuery()}`);
      this.logger.log(
        `Parameters: ${JSON.stringify(queryBuilder.getParameters())}`,
      );

      const [sceneMedias, total] = await queryBuilder.getManyAndCount();

      const result = {
        data: sceneMedias,
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      };

      this.logger.log(
        `Query executed successfully. Found ${total} scene medias`,
      );
      return result;
    } catch (error) {
      this.logger.error('Error in getAllSceneMedias:', error.message);
      this.logger.error('Stack trace:', error.stack);
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
      if (!result) this.logger.warn(`Scene media not found with id: ${case_id}`);
      return result;
    } catch (error) {
      this.logger.error('Error fetching scene medias by case_id', error.stack);
      throw error;
    }
  }
}
