import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { UpdateCaseDto } from './dto/update-case.dto';
import { SceneMediasService } from '../scene_medias/scene_medias.service';
import { InitialStatementsService } from '../initial_statements/initial_statements.service';
import { PhysicalEvidencesService } from '../physical_evidences/physical_evidences.service';
import { ResponseMessage } from 'src/decorator/customize';

import { GetCasesFilterDto } from './dto/get-case-filter.dto';

@Controller('cases')
export class CasesController {
  constructor(
    private readonly casesService: CasesService,
    private readonly sceneMediasService: SceneMediasService,
    private readonly initialStatementsService: InitialStatementsService,
    private readonly physicalEvidencesService: PhysicalEvidencesService,
  ) {}

  // @Get()
  // @ResponseMessage('Cases retrieved successfully')
  // async getAllCases() {
  //   return this.casesService.getAllCases();
  // }

  @Get()
  @ResponseMessage('Get all cases success')
  getAllCases(@Query() filterDto: GetCasesFilterDto) {
    return this.casesService.getAllCasesWithReports(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(+id);
  }

  @Get(':id/initial-response')
  @ResponseMessage('Get initial response by case_id success')
  findInitialResponseByCaseId(@Param('id') id: string) {
    return this.casesService.findCaseById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casesService.remove(id);
  }

  @Get(':caseId/scene-info')
  async getSceneInfo(@Param('caseId') caseId: string) {
    const initialStatements =
      await this.initialStatementsService.findByCaseId(caseId);
    const sceneMedias = await this.sceneMediasService.findByCaseId(caseId);
    const physicalEvidences =
      await this.physicalEvidencesService.getAllPhysicalEvidences({
        case_id: caseId,
        page: '1',
        limit: '10',
      });
    return {
      initial_statements: initialStatements,
      scene_medias: sceneMedias,
      preliminary_physical_evidences: physicalEvidences,
    };
  }
}
