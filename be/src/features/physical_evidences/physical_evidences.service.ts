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

  async findByCaseId(case_id: string) {
    // TODO: Thay thế bằng truy vấn thực tế nếu đã có repository
    // Giả sử có repository: this.physicalEvidenceRepository
    // return await this.physicalEvidenceRepository.find({ where: { case_id, is_deleted: false } });
    return [
      {
        id: 'PE-01',
        location: 'A1 – Kitchen',
        collector: 'Lt. James Potter',
        time: '14:35 – 25/06/25',
      },
      {
        id: 'PE-02',
        location: 'B2 – Living Room',
        collector: 'Sgt. Ron Weasley',
        time: '14:42 – 25/06/25',
      },
    ];
  }
}
