import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { PhysicalEvidencesService } from './physical_evidences.service';
import { CreatePhysicalEvidenceDto } from './dto/create-physical_evidence.dto';
import { UpdatePhysicalEvidenceDto } from './dto/update-physical_evidence.dto';
import { GetPhysicalEvidencesFilterDto } from './dto/get-physical_evidences-filter.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('physical-evidences')
export class PhysicalEvidencesController {
  private readonly logger = new Logger(PhysicalEvidencesController.name);

  constructor(
    private readonly physicalEvidencesService: PhysicalEvidencesService,
  ) {}

  @Post()
  @ResponseMessage('Physical evidence created successfully')
  async createPhysicalEvidence(
    @Body() createPhysicalEvidenceDto: CreatePhysicalEvidenceDto,
  ) {
    this.logger.log('Creating physical evidence...');
    return this.physicalEvidencesService.createPhysicalEvidence(
      createPhysicalEvidenceDto,
    );
  }

  @Get()
  @ResponseMessage('Physical evidences retrieved successfully')
  async getAllPhysicalEvidences(
    @Query() filterDto: GetPhysicalEvidencesFilterDto,
  ) {
    this.logger.log('Getting all physical evidences...');
    return this.physicalEvidencesService.getAllPhysicalEvidences(filterDto);
  }

  @Get(':id')
  @ResponseMessage('Physical evidence retrieved successfully')
  async getPhysicalEvidenceById(@Param('id') id: string) {
    this.logger.log(`Getting physical evidence with ID: ${id}`);
    return this.physicalEvidencesService.getPhysicalEvidenceById(id);
  }

  @Patch(':id')
  @ResponseMessage('Physical evidence updated successfully')
  async updatePhysicalEvidence(
    @Param('id') id: string,
    @Body() updatePhysicalEvidenceDto: UpdatePhysicalEvidenceDto,
  ) {
    this.logger.log(`Updating physical evidence with ID: ${id}`);
    return this.physicalEvidencesService.updatePhysicalEvidence(
      id,
      updatePhysicalEvidenceDto,
    );
  }

  @Delete(':id')
  @ResponseMessage('Physical evidence deleted successfully')
  async deletePhysicalEvidence(@Param('id') id: string) {
    this.logger.log(`Deleting physical evidence with ID: ${id}`);
    return this.physicalEvidencesService.deletePhysicalEvidence(id);
  }
}
