import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InitialResponsesService } from './initial_responses.service';
import { CreateInitialResponseDto } from './dto/create-initial_response.dto';
import { UpdateInitialResponseDto } from './dto/update-initial_response.dto';

@Controller('initial-responses')
export class InitialResponsesController {
  constructor(private readonly initialResponsesService: InitialResponsesService) {}

  @Post()
  create(@Body() createInitialResponseDto: CreateInitialResponseDto) {
    return this.initialResponsesService.create(createInitialResponseDto);
  }

  @Get()
  findAll() {
    return this.initialResponsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.initialResponsesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInitialResponseDto: UpdateInitialResponseDto) {
    return this.initialResponsesService.update(+id, updateInitialResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.initialResponsesService.remove(+id);
  }
}
