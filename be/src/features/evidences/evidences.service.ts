/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Evidence } from './entities/evidence.entity';
import { CreateEvidenceDto } from './dto/create-evidence.dto';

@Injectable()
export class EvidenceService {
  private readonly logger = new Logger(EvidenceService.name);
  constructor(
    @InjectRepository(Evidence)
    private evidenceRepository: Repository<Evidence>,
  ) {}


  async createMultipleEvidences(
    createEvidenceDtos: CreateEvidenceDto[],
    reportId: string,
    manager: EntityManager,
  ): Promise<Evidence[]> {
    this.logger.log(`Creating ${createEvidenceDtos.length} evidence items`);
    try {
      const evidenceItems = createEvidenceDtos.map((dto) => ({
        ...dto,
        report_id: reportId,
        is_deleted: false,
      }));

      const insertResult = await manager.insert(Evidence, evidenceItems);
      const ids = insertResult.identifiers.map((id) => id.evidence_id);
      const results = await manager.find(Evidence, {
        where: { evidence_id: In(ids) },
      });

      this.logger.log(`Created ${results.length} evidence items`);
      return results;
    } catch (error) {
      this.logger.error(
        'Error creating multiple evidence items:',
        error.message,
      );
      throw new InternalServerErrorException(
        'Failed to create evidence items',
        error.message,
      );
    }
  }

  async findAllEvidence(): Promise<Evidence[]> {
    this.logger.log('Fetching all evidence');
    try {
      return await this.evidenceRepository.find();
    } catch (error) {
      this.logger.error('Failed to get all evidence', error.stack);
      throw new InternalServerErrorException(
        'Failed to get all evidence',
        error.message,
      );
    }
  }

  async findOneEvidence(evidence_id: string): Promise<Evidence | null> {
    this.logger.log(`Fetching evidence with id: ${evidence_id}`);
    try {
      const evidence = await this.evidenceRepository.findOneBy({ evidence_id });
      if (!evidence) {
        this.logger.warn(`Evidence not found with id: ${evidence_id}`);
        throw new NotFoundException('Evidence not found');
      }
      return evidence;
    } catch (error) {
      this.logger.error(
        `Failed to get evidence with id: ${evidence_id}`,
        error.stack,
      );
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to get evidence',
        error.message,
      );
    }
  }

  async updateEvidence(
    evidence_id: string,
    updateDto: Partial<Evidence>,
  ): Promise<Evidence> {
    this.logger.log(`Updating evidence with id: ${evidence_id}`);
    try {
      const evidence = await this.evidenceRepository.findOneBy({ evidence_id });
      if (!evidence) {
        this.logger.warn(
          `Evidence not found for update with id: ${evidence_id}`,
        );
        throw new NotFoundException('Evidence not found');
      }
      Object.assign(evidence, updateDto);
      const result = await this.evidenceRepository.save(evidence);
      this.logger.log(`Updated evidence with id: ${evidence_id}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to update evidence with id: ${evidence_id}`,
        error.stack,
      );
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to update evidence',
        error.message,
      );
    }
  }

  async deleteEvidence(evidence_id: string): Promise<void> {
    this.logger.log(`Soft deleting evidence with id: ${evidence_id}`);
    try {
      const evidence = await this.evidenceRepository.findOneBy({ evidence_id });
      if (!evidence) {
        this.logger.warn(
          `Evidence not found for delete with id: ${evidence_id}`,
        );
        throw new NotFoundException('Evidence not found');
      }
      evidence.is_deleted = true;
      await this.evidenceRepository.save(evidence);
      this.logger.log(`Soft deleted evidence with id: ${evidence_id}`);
    } catch (error) {
      this.logger.error(
        `Failed to delete evidence with id: ${evidence_id}`,
        error.stack,
      );
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to delete evidence',
        error.message,
      );
    }
  }
}
