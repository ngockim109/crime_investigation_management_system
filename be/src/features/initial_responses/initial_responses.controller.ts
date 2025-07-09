import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InitialResponsesService } from './initial_responses.service';
import { CreateInitialResponseDto } from './dto/create-initial_response.dto';
import { UpdateInitialResponseDto } from './dto/update-initial_response.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('initial-responses')
export class InitialResponsesController {
  constructor(private readonly initialResponsesService: InitialResponsesService) { }

  @Post()
  @ResponseMessage('create initial response success')
  create(@Body() createInitialResponseDto: CreateInitialResponseDto) {
    console.log(createInitialResponseDto)
    return this.initialResponsesService.createInitialResponse(createInitialResponseDto);
  }

  @Get()
  findAll() {
    return this.initialResponsesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get initial response by id success')
  findInitialResponseById(@Param('id') id: string) {
    return this.initialResponsesService.findInitialResponseById(id);
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
