import { Injectable } from '@nestjs/common';
import { CreatePhysicalEvidenceDto } from './dto/create-physical_evidence.dto';
import { UpdatePhysicalEvidenceDto } from './dto/update-physical_evidence.dto';

@Injectable()
export class PhysicalEvidencesService {
  create(createPhysicalEvidenceDto: CreatePhysicalEvidenceDto) {
    return 'This action adds a new physicalEvidence';
  }

  findAll() {
    return `This action returns all physicalEvidences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} physicalEvidence`;
  }

  update(id: number, updatePhysicalEvidenceDto: UpdatePhysicalEvidenceDto) {
    return `This action updates a #${id} physicalEvidence`;
  }

  remove(id: number) {
    return `This action removes a #${id} physicalEvidence`;
  }
}
