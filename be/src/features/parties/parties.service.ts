/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { CreatePartyDto } from './dto/create-party.dto';
import { Party } from './entities/party.entity';
import { UpdatePartyDto } from './dto/update-party.dto';
import { GetPartiesFilterDto } from './dto/get-parties-filter.dto';
export interface PaginatedPartiesResult {
  data: Party[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class PartyService {
  private readonly logger = new Logger(PartyService.name);
  constructor(
    @InjectRepository(Party)
    private partyRepository: Repository<Party>,
  ) { }

  async createMultipleParties(
    createPartyDto: CreatePartyDto[],
    reportId: string,
    manager: EntityManager,
  ): Promise<Party[]> {
    this.logger.log(`Creating ${createPartyDto.length} relevant parties`);
    try {
      const parties = createPartyDto.map((dto) => ({
        ...dto,
        report_id: reportId,
        is_deleted: false,
      }));

      const insertResult = await manager.insert(Party, parties);
      const ids = insertResult.identifiers.map((id) => id.party_id);
      const results = await manager.find(Party, {
        where: { parties_id: In(ids) },
      });

      this.logger.log(`Created ${results.length} party parties`);
      return results;
    } catch (error) {
      this.logger.error(
        'Error creating multiple party parties:',
        error.message,
      );
      throw new InternalServerErrorException(
        'Failed to create party parties',
        error.message,
      );
    }
  }

  async findAllParties(
    filterDto: GetPartiesFilterDto,
  ): Promise<PaginatedPartiesResult> {
    try {
      this.logger.log('Filter DTO received:', JSON.stringify(filterDto));

      const {
        captured_by,
        recorded_by,
        case_id,
        date_from,
        date_to,
        page = '1',
        limit = '10',
      } = filterDto;

      const queryBuilder = this.partyRepository
        .createQueryBuilder('parties')
        .leftJoinAndSelect('parties.case', 'case')
        .where('parties.is_deleted = :isDeleted', {
          isDeleted: false,
        });

      if (captured_by && captured_by.toString().trim() !== '') {
        queryBuilder.andWhere('parties.full_name LIKE :providerName', {
          providerName: `%${captured_by}%`,
        });
        this.logger.log(`Added provider_name filter: ${captured_by}`);
      }

      if (case_id && case_id.toString().trim() !== '') {
        queryBuilder.andWhere('parties.case_id = :caseId', {
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
        queryBuilder.andWhere('parties.created_at BETWEEN :from AND :to', {
          from: new Date(date_from.toString()),
          to: new Date(date_to.toString()),
        });
        this.logger.log(`Added date range filter: ${date_from} to ${date_to}`);
      }

      const pageNumber = Math.max(1, Number.parseInt(page.toString()) || 1);
      const limitNumber = Math.max(
        1,
        Math.min(100, Number.parseInt(limit.toString()) || 10),
      );
      const skip = (pageNumber - 1) * limitNumber;

      queryBuilder.skip(skip).take(limitNumber);
      queryBuilder.orderBy('parties.created_at', 'DESC');

      this.logger.log(`Query: ${queryBuilder.getQuery()}`);
      this.logger.log(
        `Parameters: ${JSON.stringify(queryBuilder.getParameters())}`,
      );

      const [parties, total] = await queryBuilder.getManyAndCount();

      const result = {
        data: parties,
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      };

      this.logger.log(`Query executed successfully. Found ${total} parties`);
      return result;
    } catch (error) {
      this.logger.error('Error in getAllParties:', error.message);
      this.logger.error('Stack trace:', error.stack);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.partyRepository.findOne({
        where: { parties_id: id, is_deleted: false },
      });
      if (!result) this.logger.warn(`Party not found with id: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error fetching party with id: ${id}`, error.stack);
      throw error;
    }
  }

  update(id: string, updatePartyDto: UpdatePartyDto) {
    return this.partyRepository.update({ parties_id: id }, updatePartyDto);
  }

  remove(id: string) {
    return this.partyRepository.delete({ parties_id: id });
  }

  async updateCaseIdByReportId(reportId: string, caseId: string, manager: EntityManager): Promise<void> {
    try {
      await manager.update(Party, { report_id: reportId }, { case_id: caseId });
      this.logger.log(`Updated case_id for parties with report_id: ${reportId}`);
    } catch (error) {
      this.logger.error('Error updating case_id for parties:', error.message);
      throw new InternalServerErrorException('Failed to update case_id for parties', error.message);
    }
  }
}
