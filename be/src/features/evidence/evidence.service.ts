import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evidence } from './entities/evidence.entity';
import { CreateEvidenceDto } from './dto/create-evidence.dto';

@Injectable()
export class EvidenceService {
  constructor(
    @InjectRepository(Evidence)
    private evidenceRepository: Repository<Evidence>,
  ) {}

  async create(createEvidenceDto: CreateEvidenceDto): Promise<Evidence> {
    const evidence = this.evidenceRepository.create(createEvidenceDto);
    return this.evidenceRepository.save(evidence);
  }

  async findAll(): Promise<Evidence[]> {
    return this.evidenceRepository.find();
  }

  async findOne(id: number): Promise<Evidence | null> {
    return this.evidenceRepository.findOneBy({ id });
  }
} 