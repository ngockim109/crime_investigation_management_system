import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evidence } from './entities/evidence.entity';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { Attachment } from './interfaces/attachment.interface';
import { Multer } from 'multer';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class EvidenceService {
  private readonly logger = new Logger(EvidenceService.name);
  constructor(
    @InjectRepository(Evidence)
    private evidenceRepository: Repository<Evidence>,
  ) {}

  async createEvidence(
    createEvidenceDto: CreateEvidenceDto,
  ): Promise<Evidence> {
    this.logger.log('Creating new evidence');
    try {
      const evidence = this.evidenceRepository.create(createEvidenceDto);
      const result = await this.evidenceRepository.save(evidence);
      this.logger.log(`Created evidence with id: ${result.evidence_id}`);
      return result;
    } catch (error) {
      this.logger.error('Failed to create evidence', error.stack);
      throw new InternalServerErrorException(
        'Failed to create evidence',
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
