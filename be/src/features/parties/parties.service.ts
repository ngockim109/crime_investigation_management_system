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

  findAll() {
    return `This action returns all party`;
  }

  findOne(id: number) {
    return `This action returns a #${id} party`;
  }

  update(id: number, updatePartyDto: UpdatePartyDto) {
    return `This action updates a #${id} party`;
  }

  remove(id: number) {
    return `This action removes a #${id} party`;
  }
}
