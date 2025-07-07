import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreservationMeasuresService } from './preservation_measures.service';
import { CreatePreservationMeasureDto } from './dto/create-preservation_measure.dto';
import { UpdatePreservationMeasureDto } from './dto/update-preservation_measure.dto';

@Controller('preservation-measures')
export class PreservationMeasuresController {
  constructor(private readonly preservationMeasuresService: PreservationMeasuresService) {}

  @Post()
  create(@Body() createPreservationMeasureDto: CreatePreservationMeasureDto) {
    return this.preservationMeasuresService.create(createPreservationMeasureDto);
  }

  @Get()
  findAll() {
    return this.preservationMeasuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preservationMeasuresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreservationMeasureDto: UpdatePreservationMeasureDto) {
    return this.preservationMeasuresService.update(+id, updatePreservationMeasureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preservationMeasuresService.remove(+id);
  }
}
