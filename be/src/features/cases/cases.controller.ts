import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { SceneMediasService } from '../scene_medias/scene_medias.service';
import { InitialStatementsService } from '../initial_statements/initial_statements.service';
import { PhysicalEvidencesService } from '../physical_evidences/physical_evidences.service';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('cases')
export class CasesController {
  constructor(
    private readonly casesService: CasesService,
    private readonly sceneMediasService: SceneMediasService,
    private readonly initialStatementsService: InitialStatementsService,
    private readonly physicalEvidencesService: PhysicalEvidencesService,
  ) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.casesService.create(createCaseDto);
  }

  @Get()
  @ResponseMessage('Cases retrieved successfully')
  async getAllCases() {
    return this.casesService.getAllCases();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
    return this.casesService.update(+id, updateCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casesService.remove(+id);
  }

}
