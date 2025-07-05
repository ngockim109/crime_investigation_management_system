import { Injectable } from '@nestjs/common';
import { CreateInitialResponseDto } from './dto/create-initial_response.dto';
import { UpdateInitialResponseDto } from './dto/update-initial_response.dto';

@Injectable()
export class InitialResponsesService {
  create(createInitialResponseDto: CreateInitialResponseDto) {
    return 'This action adds a new initialResponse';
  }

  findAll() {
    return `This action returns all initialResponses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} initialResponse`;
  }

  update(id: number, updateInitialResponseDto: UpdateInitialResponseDto) {
    return `This action updates a #${id} initialResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} initialResponse`;
  }
}
