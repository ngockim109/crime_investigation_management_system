import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalSupportsService } from './medical_supports.service';
import { CreateMedicalSupportDto } from './dto/create-medical_support.dto';
import { UpdateMedicalSupportDto } from './dto/update-medical_support.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('medical-supports')
export class MedicalSupportsController {
  constructor(private readonly medicalSupportsService: MedicalSupportsService) { }

  @Get()
  findMedicalSupports() {
    return this.medicalSupportsService.findMedicalSupports();
  }

  @Get(':id')
  @ResponseMessage('Get medical support by id success')
  findMedicalSupportById(@Param('id') id: string) {
    return this.medicalSupportsService.findMedicalSupportById(id);
  }

  @Patch(':id')
  @ResponseMessage('Update medical support by id success')
  updateMedicalSupport(@Param('id') id: string, @Body() updateMedicalSupportDto: UpdateMedicalSupportDto) {
    return this.medicalSupportsService.updateMedicalSupport(id, updateMedicalSupportDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete medical support by id success')
  removeMedicalSupport(@Param('id') id: string) {
    return this.medicalSupportsService.removeMedicalSupport(id);
  }
}
