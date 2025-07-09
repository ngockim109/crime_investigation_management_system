/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PhysicalEvidence } from './entities/physical_evidence.entity';
import { CreatePhysicalEvidenceDto } from './dto/create-physical_evidence.dto';
import { UpdatePhysicalEvidenceDto } from './dto/update-physical_evidence.dto';
import { GetPhysicalEvidencesFilterDto } from './dto/get-physical_evidences-filter.dto';

export interface PaginatedPhysicalEvidenceResult {
  data: PhysicalEvidence[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class PhysicalEvidencesService {
  private readonly logger = new Logger(PhysicalEvidencesService.name);

  constructor(
    @InjectRepository(PhysicalEvidence)
    private physicalEvidenceRepository: Repository<PhysicalEvidence>,
    private dataSource: DataSource,
  ) {}

  async createPhysicalEvidence(
    createPhysicalEvidenceDto: CreatePhysicalEvidenceDto,
  ): Promise<PhysicalEvidence> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingEvidence = await queryRunner.manager.findOne(
        PhysicalEvidence,
        {
          where: {
            identification_code: createPhysicalEvidenceDto.identification_code,
          },
        },
      );

      if (existingEvidence) {
        throw new ConflictException(
          `Physical evidence with identification code '${createPhysicalEvidenceDto.identification_code}' already exists`,
        );
      }

      const physicalEvidence = this.physicalEvidenceRepository.create({
        ...createPhysicalEvidenceDto,
        collected_time: new Date(createPhysicalEvidenceDto.collected_time),
        is_deleted: false,
      });

      const savedPhysicalEvidence =
        await this.physicalEvidenceRepository.save(physicalEvidence);

      this.logger.log(
        `Created physical evidence with ID: ${savedPhysicalEvidence.physical_evidence_id}`,
      );

      return await this.getPhysicalEvidenceById(
        savedPhysicalEvidence.physical_evidence_id,
      );
    } catch (error) {
      this.logger.error('Error creating physical evidence:', error.message);
      throw error;
    }
  }

  async getAllPhysicalEvidences(
    filterDto: GetPhysicalEvidencesFilterDto,
  ): Promise<PaginatedPhysicalEvidenceResult> {
    try {
      this.logger.log('Filter DTO received:', JSON.stringify(filterDto));

      const {
        identification_code,
        scene_location,
        collector_username,
        case_id,
        collected_from,
        collected_to,
        page = '1',
        limit = '10',
      } = filterDto;

      const queryBuilder = this.physicalEvidenceRepository
        .createQueryBuilder('physical_evidence')
        .leftJoinAndSelect('physical_evidence.collector', 'collector')
        .leftJoinAndSelect('physical_evidence.case', 'case')
        .where('physical_evidence.is_deleted = :isDeleted', {
          isDeleted: false,
        });

      // Add filters if they have actual values (not empty strings)
      if (identification_code && identification_code.toString().trim() !== '') {
        queryBuilder.andWhere(
          'physical_evidence.identification_code ILIKE :identificationCode',
          {
            identificationCode: `%${identification_code}%`,
          },
        );
        this.logger.log(
          `Added identification_code filter: ${identification_code}`,
        );
      }

      if (scene_location && scene_location.toString().trim() !== '') {
        queryBuilder.andWhere(
          'physical_evidence.scene_location ILIKE :sceneLocation',
          {
            sceneLocation: `%${scene_location}%`,
          },
        );
        this.logger.log(`Added scene_location filter: ${scene_location}`);
      }

      if (collector_username && collector_username.toString().trim() !== '') {
        queryBuilder.andWhere('collector.username = :collectorUsername', {
          collectorUsername: collector_username,
        });
        this.logger.log(
          `Added collector_username filter: ${collector_username}`,
        );
      }

      if (case_id && case_id.toString().trim() !== '') {
        queryBuilder.andWhere('physical_evidence.case_id = :caseId', {
          caseId: case_id,
        });
        this.logger.log(`Added case_id filter: ${case_id}`);
      }

      if (
        collected_from &&
        collected_from.toString().trim() !== '' &&
        collected_to &&
        collected_to.toString().trim() !== ''
      ) {
        queryBuilder.andWhere(
          'physical_evidence.collected_time BETWEEN :from AND :to',
          {
            from: new Date(collected_from.toString()),
            to: new Date(collected_to.toString()),
          },
        );
        this.logger.log(
          `Added date range filter: ${collected_from} to ${collected_to}`,
        );
      }

      const pageNumber = Math.max(1, Number.parseInt(page.toString()) || 1);
      const limitNumber = Math.max(
        1,
        Math.min(100, Number.parseInt(limit.toString()) || 10),
      );
      const skip = (pageNumber - 1) * limitNumber;

      queryBuilder.skip(skip).take(limitNumber);
      queryBuilder.orderBy('physical_evidence.collected_time', 'DESC');

      this.logger.log(`Query: ${queryBuilder.getQuery()}`);
      this.logger.log(
        `Parameters: ${JSON.stringify(queryBuilder.getParameters())}`,
      );

      const [physicalEvidences, total] = await queryBuilder.getManyAndCount();

      const result = {
        data: physicalEvidences,
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      };

      this.logger.log(
        `Query executed successfully. Found ${total} physical evidences`,
      );
      return result;
    } catch (error) {
      this.logger.error('Error in getAllPhysicalEvidences:', error.message);
      this.logger.error('Stack trace:', error.stack);
      throw error;
    }
  }

  async getPhysicalEvidenceById(id: string): Promise<PhysicalEvidence> {
    try {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        throw new BadRequestException('Invalid physical evidence ID format');
      }

      const physicalEvidence = await this.physicalEvidenceRepository.findOne({
        where: {
          physical_evidence_id: id,
          is_deleted: false,
        },
        relations: ['collector', 'case'],
      });

      if (!physicalEvidence) {
        throw new NotFoundException(
          `Physical evidence with ID ${id} not found`,
        );
      }

      this.logger.log(`Found physical evidence with ID: ${id}`);
      return physicalEvidence;
    } catch (error) {
      this.logger.error(
        `Error getting physical evidence by ID ${id}:`,
        error.message,
      );
      throw error;
    }
  }

  async updatePhysicalEvidence(
    id: string,
    updatePhysicalEvidenceDto: UpdatePhysicalEvidenceDto,
  ): Promise<PhysicalEvidence> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const physicalEvidence = await this.getPhysicalEvidenceById(id);
      if (!physicalEvidence) {
        throw new NotFoundException(
          `Physical evidence with ID '${id}' not found`,
        );
      }
      if (
        updatePhysicalEvidenceDto.identification_code &&
        updatePhysicalEvidenceDto.identification_code !==
          physicalEvidence.identification_code
      ) {
        const existingEvidence = await queryRunner.manager.findOne(
          PhysicalEvidence,
          {
            where: {
              identification_code:
                updatePhysicalEvidenceDto.identification_code,
            },
          },
        );

        if (existingEvidence) {
          throw new ConflictException(
            `Physical evidence with identification code '${updatePhysicalEvidenceDto.identification_code}' already exists`,
          );
        }
      }

      const updateData: any = { ...updatePhysicalEvidenceDto };
      if (updatePhysicalEvidenceDto.collected_time) {
        updateData.collected_time = new Date(
          updatePhysicalEvidenceDto.collected_time,
        );
      }

      await this.physicalEvidenceRepository.update(id, updateData);
      await queryRunner.commitTransaction();

      this.logger.log(`Updated physical evidence with ID: ${id}`);
      return await this.getPhysicalEvidenceById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Error updating physical evidence with ID ${id}:`,
        error.message,
      );
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deletePhysicalEvidence(id: string): Promise<void> {
    try {
      const physicalEvidence = await this.getPhysicalEvidenceById(id);

      await this.physicalEvidenceRepository.update(id, {
        is_deleted: true,
      });

      this.logger.log(`Soft deleted physical evidence with ID: ${id}`);
    } catch (error) {
      this.logger.error(
        `Error deleting physical evidence with ID ${id}:`,
        error.message,
      );
      throw error;
    }
  }

  async findByCaseId(case_id: string) {
    // TODO: Thay thế bằng truy vấn thực tế nếu đã có repository
    // Giả sử có repository: this.physicalEvidenceRepository
    // return await this.physicalEvidenceRepository.find({ where: { case_id, is_deleted: false } });
    return [
      {
        id: 'PE-01',
        location: 'A1 – Kitchen',
        collector: 'Lt. James Potter',
        time: '14:35 – 25/06/25',
      },
      {
        id: 'PE-02',
        location: 'B2 – Living Room',
        collector: 'Sgt. Ron Weasley',
        time: '14:42 – 25/06/25',
      },
    ];
  }
}
