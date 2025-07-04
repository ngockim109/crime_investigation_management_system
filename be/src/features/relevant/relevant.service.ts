/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRelevantDto } from './dto/create-relevant.dto';
import { UpdateRelevantDto } from './dto/update-relevant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Relevant } from './entities/relevant.entity';

@Injectable()
export class RelevantService {
  private readonly logger = new Logger(RelevantService.name);
  constructor(
    @InjectRepository(Relevant)
    private relevantRepository: Repository<Relevant>,
  ) {}

  async createRelevantParty(createRelevantDto: CreateRelevantDto[]) {
    try {
      const newRelevant = await this.relevantRepository.insert({
        ...createRelevantDto,
        is_deleted: false,
      });
      return newRelevant.identifiers.map((id) => id);
    } catch (error) {
      this.logger.error('Error creating relevant:', error.message);
      throw error;
    }
  }

  async createMultipleRelevantParties(
    createRelevantDtos: CreateRelevantDto[],
    reportId: string,
    manager: EntityManager,
  ): Promise<Relevant[]> {
    this.logger.log(`Creating ${createRelevantDtos.length} relevant parties`);
    try {
      const relevantParties = createRelevantDtos.map((dto) => ({
        ...dto,
        report_id: reportId,
        is_deleted: false,
      }));

      const insertResult = await manager.insert(Relevant, relevantParties);
      const ids = insertResult.identifiers.map((id) => id.relevant_id);
      const results = await manager.find(Relevant, {
        where: { relevant_id: In(ids) },
      });

      this.logger.log(`Created ${results.length} relevant parties`);
      return results;
    } catch (error) {
      this.logger.error(
        'Error creating multiple relevant parties:',
        error.message,
      );
      throw new InternalServerErrorException(
        'Failed to create relevant parties',
        error.message,
      );
    }
  }

  findAll() {
    return `This action returns all relevant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} relevant`;
  }

  update(id: number, updateRelevantDto: UpdateRelevantDto) {
    return `This action updates a #${id} relevant`;
  }

  remove(id: number) {
    return `This action removes a #${id} relevant`;
  }
}
