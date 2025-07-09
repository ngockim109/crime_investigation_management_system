import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateInitialResponseDto } from './dto/create-initial_response.dto';
import { UpdateInitialResponseDto } from './dto/update-initial_response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InitialResponse } from './entities/initial_response.entity';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { PreservationMeasuresService } from '../preservation_measures/preservation_measures.service';
import { MedicalSupportsService } from '../medical_supports/medical_supports.service';
import { plainToInstance } from 'class-transformer';
import { InitialResponseDetailDto } from './dto/initial-response-detail.dto';
import { InitialResponseDetail } from 'src/common/types/initial-response.interface';

@Injectable()
export class InitialResponsesService {
  constructor(
    @InjectRepository(InitialResponse)
    private initialResponseRepository: Repository<InitialResponse>,
    private dataSource: DataSource,
    private preservationMeasuresService: PreservationMeasuresService,
    private medicalSupportsService: MedicalSupportsService,
  ) { }

  async createInitialResponse(createInitialResponseDto: CreateInitialResponseDto): Promise<InitialResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const { preservation_measures, medical_supports, ...initialResponseDto } = createInitialResponseDto
      const newInitialResponse = await this.initialResponseRepository.create(initialResponseDto)
      const saveInitialResponse = await queryRunner.manager.save(newInitialResponse);

      if (preservation_measures && preservation_measures.length > 0) {
        await this.preservationMeasuresService.createMultiplePreservationMeasures(
          preservation_measures,
          saveInitialResponse.initial_responses_id,
          queryRunner.manager,
        );
      }

      if (medical_supports && medical_supports.length > 0) {
        await this.medicalSupportsService.createMultipleMedicalSupports(
          medical_supports,
          saveInitialResponse.initial_responses_id,
          queryRunner.manager,
        );
      }

      await queryRunner.commitTransaction();
      return saveInitialResponse
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
        throw new ConflictException('Initial response for this case already exists.');
      }
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.initialResponseRepository.find({
      relations: ["preservation_measures", "medical_supports"]
    });
  }

  async findInitialResponseById(id: string): Promise<InitialResponseDetail> {
    try {
      const initialResponse = await this.initialResponseRepository.findOne({
        where: {
          initial_responses_id: id,
          is_deleted: false,
        },
        relations: ['preservation_measures', 'medical_supports'],
      })

      if (!initialResponse) {
        throw new NotFoundException(`InitialResponse with ID ${id} not found`);
      }

      return plainToInstance(InitialResponseDetailDto, initialResponse, { excludeExtraneousValues: true });
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateInitialResponseDto: UpdateInitialResponseDto) {
    return `This action updates a #${id} initialResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} initialResponse`;
  }
}
