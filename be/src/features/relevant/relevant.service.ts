import { Injectable, Logger } from '@nestjs/common';
import { CreateRelevantDto } from './dto/create-relevant.dto';
import { UpdateRelevantDto } from './dto/update-relevant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relevant } from './entities/relevant.entity';

@Injectable()
export class RelevantService {
    private readonly logger = new Logger(RelevantService.name);
  constructor(
    @InjectRepository(Relevant)
    private relevantRepository: Repository<Relevant>,
  ) {}

  async createRelevantParty(createRelevantDto: CreateRelevantDto[])  {
    try {
      const newRelevant = await this.relevantRepository.insert({
        ...createRelevantDto,
        is_deleted: false
      })
      return newRelevant.identifiers.map(id => id )
    } catch (error) {
      this.logger.error('Error creating relevant:', error.message);
      throw error;
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
