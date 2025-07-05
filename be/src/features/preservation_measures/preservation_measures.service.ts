import { Injectable } from '@nestjs/common';
import { CreatePreservationMeasureDto } from './dto/create-preservation_measure.dto';
import { UpdatePreservationMeasureDto } from './dto/update-preservation_measure.dto';

@Injectable()
export class PreservationMeasuresService {
  create(createPreservationMeasureDto: CreatePreservationMeasureDto) {
    return 'This action adds a new preservationMeasure';
  }

  findAll() {
    return `This action returns all preservationMeasures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preservationMeasure`;
  }

  update(id: number, updatePreservationMeasureDto: UpdatePreservationMeasureDto) {
    return `This action updates a #${id} preservationMeasure`;
  }

  remove(id: number) {
    return `This action removes a #${id} preservationMeasure`;
  }
}
