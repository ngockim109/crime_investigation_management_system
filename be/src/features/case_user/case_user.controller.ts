import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CaseUserService } from './case_user.service';
import { CreateCaseUserDto } from './dto/create-case_user.dto';
import { UpdateCaseUserDto } from './dto/update-case_user.dto';
import { Public, ResponseMessage, SkipCheckPermission } from 'src/decorator/customize';

@Controller('case-user')
export class CaseUserController {
  constructor(private readonly caseUserService: CaseUserService) { }

  @Post()
  @Public()
  @ResponseMessage("Create case users successfully")
  @SkipCheckPermission()
  create(@Body() createCaseUserDto: CreateCaseUserDto[]) {
    return this.caseUserService.create(createCaseUserDto);
  }

  // @Get()
  // @Public()
  // @SkipCheckPermission()
  // @ResponseMessage("Get all case users successfully")
  // findAll(
  //   @Query("current") currentPage: string,
  //   @Query("pageSize") limit: string,
  //   @Query() qs: string
  // ) {
  //   return this.caseUserService.findAll(+currentPage, +limit, qs);
  // }

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

  @Get(':id/case-id')
  getUsersByCaseId(@Param('id') id: string) {
    return this.caseUserService.getUsersByCaseId(id);
  }
}