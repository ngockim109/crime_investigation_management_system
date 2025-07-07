import { Injectable } from '@nestjs/common';
import { CreateMedicalSupportDto } from './dto/create-medical_support.dto';
import { UpdateMedicalSupportDto } from './dto/update-medical_support.dto';

@Injectable()
export class MedicalSupportsService {
  create(createMedicalSupportDto: CreateMedicalSupportDto) {
    return 'This action adds a new medicalSupport';
  }

  findAll() {
    return `This action returns all medicalSupports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalSupport`;
  }

  update(id: number, updateMedicalSupportDto: UpdateMedicalSupportDto) {
    return `This action updates a #${id} medicalSupport`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalSupport`;
  }
}
