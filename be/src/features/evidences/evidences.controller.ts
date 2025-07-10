import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  Put,
  Delete,
  Logger,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { EvidenceService } from './evidences.service';
import { ResponseMessage } from 'src/decorator/customize';
import { Multer } from 'multer';
import { UploadService } from '../files/files.service';
import { UploadFileDto } from '../files/dto/upload-file.dto';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { UpdateEvidenceDto } from './dto/update-evidence.dto';

@Controller('evidences')
export class EvidenceController {
  private readonly logger = new Logger(EvidenceController.name);
  constructor(
    private readonly evidenceService: EvidenceService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @ResponseMessage('Create evidence successfully')
  @UseInterceptors(AnyFilesInterceptor())
  async createEvidence(
    @Body() createEvidenceDto: CreateEvidenceDto,
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    this.logger.log('Creating new evidence');

    const uploadResults = await Promise.all(
      files.map((file) =>
        this.uploadService.uploadFileToCloudinary(file, uploadFileDto.folder),
      ),
    );
    const attached_file = uploadResults.map((uploaded) => uploaded.secure_url);

    const evidenceData = {
      ...createEvidenceDto,
      attached_file,
    };
  }

  @Get()
  findAll() {
    this.logger.log('Fetching all evidence');
    return this.evidenceService.findAllEvidence();
  }

  @Get(':evidence_id')
  findOne(@Param('evidence_id') id: string) {
    this.logger.log(`Fetching evidence with id: ${id}`);
    return this.evidenceService.findOneEvidence(id);
  }

  @Put(':evidence_id')
  @ResponseMessage('Evidence updated successfully')
  @UseInterceptors(AnyFilesInterceptor())
  async updateEvidence(
    @Param('evidence_id') id: string,
    @Body() updateEvidenceDto: UpdateEvidenceDto,
  ) {
    this.logger.log(`Updating evidence with id: ${id}`);
    let attached_file = updateEvidenceDto.attached_file;
    const updateData = {
      ...updateEvidenceDto,
      attached_file,
    };
    return this.evidenceService.updateEvidence(id, updateData);
  }

  @Delete(':evidence_id')
  @ResponseMessage('Evidence deleted successfully')
  async removeEvidence(@Param('evidence_id') id: string) {
    this.logger.log(`Deleting evidence with id: ${id}`);
    await this.evidenceService.deleteEvidence(id);
    return { message: 'Evidence deleted successfully' };
  }
}
