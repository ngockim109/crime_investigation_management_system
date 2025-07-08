import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreservationMeasuresService } from './preservation_measures.service';
import { CreatePreservationMeasureDto } from './dto/create-preservation_measure.dto';
import { UpdatePreservationMeasureDto } from './dto/update-preservation_measure.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('preservation-measures')
export class PreservationMeasuresController {
  constructor(private readonly preservationMeasuresService: PreservationMeasuresService) { }

  @Get()
  findAll() {
    return this.preservationMeasuresService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get preservation measure by id success')
  findPreservationMeasuresById(@Param('id') id: string) {
    return this.preservationMeasuresService.findPreservationMeasuresById(id);
  }

  @Patch(':id')
  @ResponseMessage('Update preservation measure success')
  updatePreservationMeasure(@Param('id') id: string, @Body() updatePreservationMeasureDto: UpdatePreservationMeasureDto) {
    return this.preservationMeasuresService.updatePreservationMeasure(id, updatePreservationMeasureDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete preservation measure success')
  removePreservationMeasure(@Param('id') id: string) {
    return this.preservationMeasuresService.removePreservationMeasure(id);
  }
}
