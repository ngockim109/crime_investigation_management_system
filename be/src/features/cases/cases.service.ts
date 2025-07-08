/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-useless-catch */
import { Injectable } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './entities/case.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private casesRepository: Repository<Case>,
  ) {}
  create(createCaseDto: CreateCaseDto) {
    return 'This action adds a new case';
  }

  async getAllCases(): Promise<Case[]> {
    try {
      const cases = await this.casesRepository.find({
        select: ['case_id'],
        order: { case_id: 'ASC' },
      });

      return cases;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} case`;
  }

  update(id: number, updateCaseDto: UpdateCaseDto) {
    return `This action updates a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
