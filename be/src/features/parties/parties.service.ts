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

@Injectable()
export class PartyService {
  private readonly logger = new Logger(PartyService.name);
  constructor(
    @InjectRepository(Party)
    private partyRepository: Repository<Party>,
  ) {}

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

  async findAll(case_id?: string) {
    try {
      if (case_id) {
        const result = await this.partyRepository.find({ where: {  case_id, is_deleted: false } });
      }
      const result = await this.partyRepository.find({ where: { is_deleted: false } });
     
      this.logger.log(`Fetched ${result.length} scene medias`);
      return result;
    } catch (error) {
      this.logger.error('Error fetching scene medias', error.stack);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const result = await this.partyRepository.findOne({ where: { parties_id: id, is_deleted: false } });
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
}
