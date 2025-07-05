import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhysicalEvidencesService } from './physical_evidences.service';
import { CreatePhysicalEvidenceDto } from './dto/create-physical_evidence.dto';
import { UpdatePhysicalEvidenceDto } from './dto/update-physical_evidence.dto';

@Controller('physical-evidences')
export class PhysicalEvidencesController {
  constructor(private readonly physicalEvidencesService: PhysicalEvidencesService) {}

  @Post()
  create(@Body() createPhysicalEvidenceDto: CreatePhysicalEvidenceDto) {
    return this.physicalEvidencesService.create(createPhysicalEvidenceDto);
  }

  @Get()
  findAll() {
    return this.physicalEvidencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicalEvidencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicalEvidenceDto: UpdatePhysicalEvidenceDto) {
    return this.physicalEvidencesService.update(+id, updatePhysicalEvidenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicalEvidencesService.remove(+id);
  }
}
