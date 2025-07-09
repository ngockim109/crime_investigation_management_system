import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePreservationMeasureDto } from './dto/create-preservation_measure.dto';
import { UpdatePreservationMeasureDto } from './dto/update-preservation_measure.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PreservationMeasure } from './entities/preservation_measure.entity';
import { plainToInstance } from 'class-transformer';
import { IPreservationMeasureDetailDto } from 'src/common/types/preservation-measure.interface';
import { PreservationMeasureDetailDto } from './dto/preservation-measure-response.dto';

@Injectable()
export class PreservationMeasuresService {
  constructor(
    @InjectRepository(PreservationMeasure)
    private preservationMeasureRepository: Repository<PreservationMeasure>,
  ) { }

  async createMultiplePreservationMeasures(
    createPreservationMeasureDto: CreatePreservationMeasureDto[],
    initial_responses_id: string,
    manager: EntityManager,
  ) {
    try {
      const preservationMeasures = createPreservationMeasureDto.map((dto) => ({
        ...dto,
        initial_responses_id
      }));

      await manager.insert(PreservationMeasure, preservationMeasures);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create Preservation Measure items',
        error.message,
      );
    }
  }

  async findAll() {
    return await this.preservationMeasureRepository.find()
  }

  async findPreservationMeasuresById(id: string): Promise<IPreservationMeasureDetailDto> {
    try {
      const preservationMeasure = await this.preservationMeasureRepository.findOne({
        where: {
          preservation_measures_id: id,
          is_deleted: false
        },
        relations: ['officer']
      })

      if (!preservationMeasure) {
        throw new NotFoundException(`Preservation measure with ID ${id} not found`)
      }

      return plainToInstance(PreservationMeasureDetailDto, preservationMeasure, { excludeExtraneousValues: true });
    } catch (error) {
      throw error
    }
  }

  async updatePreservationMeasure(
    id: string,
    updatePreservationMeasureDto: UpdatePreservationMeasureDto,
  ): Promise<IPreservationMeasureDetailDto> {
    try {
      const measure = await this.preservationMeasureRepository.findOne({
        where: {
          preservation_measures_id: id,
          is_deleted: false
        }
      });

      if (!measure) {
        throw new NotFoundException(`Preservation measure with ID ${id} not found`);
      }

      Object.assign(measure, updatePreservationMeasureDto);
      const savedMeasure = await this.preservationMeasureRepository.save(measure);
      return plainToInstance(PreservationMeasureDetailDto, savedMeasure, { excludeExtraneousValues: true });
    } catch (error) {
      throw error
    }
  }

  async removePreservationMeasure(id: string): Promise<{ is_deleted: boolean }> {
    try {
      const measure = await this.preservationMeasureRepository.findOne({
        where: {
          preservation_measures_id: id,
          is_deleted: false,
        },
      });

      if (!measure) {
        throw new NotFoundException(`Preservation measure with ID ${id} not found`);
      }

      measure.is_deleted = true;
      const savedMeasure = await this.preservationMeasureRepository.save(measure);

      return {
        is_deleted: savedMeasure.is_deleted
      }
    } catch (error) {
      throw error;
    }
  }
}
