import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalSupportsService } from './medical_supports.service';
import { CreateMedicalSupportDto } from './dto/create-medical_support.dto';
import { UpdateMedicalSupportDto } from './dto/update-medical_support.dto';

@Controller('medical-supports')
export class MedicalSupportsController {
  constructor(private readonly medicalSupportsService: MedicalSupportsService) {}

  @Post()
  create(@Body() createMedicalSupportDto: CreateMedicalSupportDto) {
    return this.medicalSupportsService.create(createMedicalSupportDto);
  }

  @Get()
  findAll() {
    return this.medicalSupportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalSupportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalSupportDto: UpdateMedicalSupportDto) {
    return this.medicalSupportsService.update(+id, updateMedicalSupportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalSupportsService.remove(+id);
  }
}
