import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelevantService } from './relevant.service';
import { UpdateRelevantDto } from './dto/update-relevant.dto';

@Controller('relevant')
export class RelevantController {
  constructor(private readonly relevantService: RelevantService) {}

  @Post()
  create() {
  }

  @Get()
  findAll() {
    return this.relevantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relevantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelevantDto: UpdateRelevantDto) {
    return this.relevantService.update(+id, updateRelevantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relevantService.remove(+id);
  }
}
