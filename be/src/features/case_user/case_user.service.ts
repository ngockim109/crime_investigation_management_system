import { Injectable } from '@nestjs/common';
import { CreateCaseUserDto } from './dto/create-case_user.dto';
import { UpdateCaseUserDto } from './dto/update-case_user.dto';

@Injectable()
export class CaseUserService {
  create(createCaseUserDto: CreateCaseUserDto) {
    return 'This action adds a new caseUser';
  }

  findAll() {
    return `This action returns all caseUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caseUser`;
  }

  update(id: number, updateCaseUserDto: UpdateCaseUserDto) {
    return `This action updates a #${id} caseUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} caseUser`;
  }
}
