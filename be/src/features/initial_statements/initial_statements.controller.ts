import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InitialStatementsService } from './initial_statements.service';
import { CreateInitialStatementDto } from './dto/create-initial_statement.dto';
import { UpdateInitialStatementDto } from './dto/update-initial_statement.dto';
import { GetInitialStatementsFilterDto } from './dto/get-initial_statements-filter.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('initial-statements')
export class InitialStatementsController {
  constructor(private readonly initialStatementsService: InitialStatementsService) {}

  @Post()
  createInitialStatements(@Body() createInitialStatementDto: CreateInitialStatementDto) {
    return this.initialStatementsService.createInitialStatements(createInitialStatementDto);
  }

  @Get()
  @ResponseMessage('Initial statements retrieved successfully')
  async findAllInitialStatements(
    @Query() filterDto: GetInitialStatementsFilterDto,
  ) {
    return this.initialStatementsService.findAllInitialStatements(filterDto);
  }

  @Get(':id')
  findOneInitialStatements(@Param('id') id: string) {
    return this.initialStatementsService.findOneInitialStatements(id);
  }

  @Patch(':id')
  updateInitialStatements(@Param('id') id: string, @Body() updateInitialStatementDto: UpdateInitialStatementDto) {
    return this.initialStatementsService.updateInitialStatements(id, updateInitialStatementDto);
  }

  @Delete(':id')
  removeInitialStatements(@Param('id') id: string) {
    return this.initialStatementsService.removeInitialStatements(id);
  }
}
