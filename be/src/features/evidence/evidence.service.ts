import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evidence } from './entities/evidence.entity';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { Attachment } from './interfaces/attachment.interface';
import { Multer } from 'multer';
import { FileUploadService } from '../cloudinary/file-upload.service';

@Injectable()
export class EvidenceService {
  constructor(
    @InjectRepository(Evidence)
    private evidenceRepository: Repository<Evidence>,
    private readonly fileUploadService: FileUploadService,
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

  async uploadMultipleFiles(files: Multer.File[]): Promise<Attachment[]> {
    return this.fileUploadService.uploadMultipleFiles(files, 'evidence');
  }

  async uploadEvidenceFiles(files: Multer.File[]): Promise<Attachment[]> {
    return this.fileUploadService.uploadMultipleFiles(files);
  }
} 