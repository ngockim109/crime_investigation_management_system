import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { EvidenceService } from './evidence.service';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { ResponseMessage } from 'src/decorator/customize';
import { Multer } from 'multer';

@Controller('evidence')
export class EvidenceController {
  constructor(
    private readonly evidenceService: EvidenceService,
  ) {}

  // API tạo evidence với upload file qua cloudinary controller (Cách 3)
  @Post('create-evidence')
  @ResponseMessage('Tạo evidence thành công')
  @UseInterceptors(AnyFilesInterceptor())
  async createEvidence(
    @Body() body: any,
    @UploadedFiles() files: Multer.File[],
  ) {
    // Upload files qua cloudinary controller
    const attachments = await this.evidenceService.uploadEvidenceFiles(files);

    // Tạo evidence với attachments
    const evidenceData = {
      type: body.type,
      location: body.location,
      description: body.description,
      attachments,
    };
    console.log("lof", evidenceData)
    return this.evidenceService.create(evidenceData);
  }

  @Get()
  findAll() {
    return this.evidenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evidenceService.findOne(+id);
  }
} 