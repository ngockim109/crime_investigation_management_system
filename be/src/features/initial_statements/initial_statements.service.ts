import { Injectable } from '@nestjs/common';
import { CreateInitialStatementDto } from './dto/create-initial_statement.dto';
import { UpdateInitialStatementDto } from './dto/update-initial_statement.dto';

@Injectable()
export class InitialStatementsService {
  create(createInitialStatementDto: CreateInitialStatementDto) {
    return 'This action adds a new initialStatement';
  }

  findAll() {
    return `This action returns all initialStatements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} initialStatement`;
  }

  update(id: number, updateInitialStatementDto: UpdateInitialStatementDto) {
    return `This action updates a #${id} initialStatement`;
  }

  remove(id: number) {
    return `This action removes a #${id} initialStatement`;
  }
}
