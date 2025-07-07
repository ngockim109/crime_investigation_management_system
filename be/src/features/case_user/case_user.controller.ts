import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaseUserService } from './case_user.service';
import { CreateCaseUserDto } from './dto/create-case_user.dto';
import { UpdateCaseUserDto } from './dto/update-case_user.dto';

@Controller('case-user')
export class CaseUserController {
  constructor(private readonly caseUserService: CaseUserService) {}

  @Post()
  create(@Body() createCaseUserDto: CreateCaseUserDto) {
    return this.caseUserService.create(createCaseUserDto);
  }

  @Get()
  findAll() {
    return this.caseUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseUserDto: UpdateCaseUserDto) {
    return this.caseUserService.update(+id, updateCaseUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseUserService.remove(+id);
  }
}
