import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { SceneMediasService } from '../scene_medias/scene_medias.service';
import { InitialStatementsService } from '../initial_statements/initial_statements.service';
import { PhysicalEvidencesService } from '../physical_evidences/physical_evidences.service';

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
  findAll() {
    return this.casesService.findAll();
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

  @Get(':caseId/scene-info')
  async getSceneInfo(@Param('caseId') caseId: string) {
    const initialStatements = await this.initialStatementsService.findByCaseId(caseId);
    const sceneMedias = await this.sceneMediasService.findByCaseId(caseId);
    const physicalEvidences = await this.physicalEvidencesService.findByCaseId(caseId);
    return {
      initial_statements: initialStatements,
      scene_medias: sceneMedias,
      preliminary_physical_evidences: physicalEvidences,
    };
  }
}
