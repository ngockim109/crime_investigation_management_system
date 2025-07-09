import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CasesService } from './cases.service';
import { UpdateCaseDto } from './dto/update-case.dto';
import { ResponseMessage } from 'src/decorator/customize';
import { GetCasesFilterDto } from './dto/get-case-filter.dto';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) { }

  @Get()
  @ResponseMessage('Get all cases success')
  getAllCases(@Query() filterDto: GetCasesFilterDto) {
    return this.casesService.getAllCasesWithReports(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(+id);
  }

  @Get(':id/initial-response')
  @ResponseMessage('Get initial response by case_id success')
  findInitialResponseByCaseId(@Param('id') id: string) {
    return this.casesService.findCaseById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casesService.remove(+id);
  }
}
