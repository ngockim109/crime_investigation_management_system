import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InitialStatementsService } from './initial_statements.service';
import { CreateInitialStatementDto } from './dto/create-initial_statement.dto';
import { UpdateInitialStatementDto } from './dto/update-initial_statement.dto';

@Controller('initial-statements')
export class InitialStatementsController {
  constructor(private readonly initialStatementsService: InitialStatementsService) {}

  @Post()
  create(@Body() createInitialStatementDto: CreateInitialStatementDto) {
    return this.initialStatementsService.create(createInitialStatementDto);
  }

  @Get()
  findAll() {
    return this.initialStatementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.initialStatementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInitialStatementDto: UpdateInitialStatementDto) {
    return this.initialStatementsService.update(+id, updateInitialStatementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.initialStatementsService.remove(+id);
  }
}
