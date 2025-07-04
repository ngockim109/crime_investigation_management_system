import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { ResponseMessage } from 'src/decorator/customize';
import { ResponseUploadFileDto } from './dto/upload-response.dto';
import { multerConfig } from 'src/core/config/multer.config';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('cloud-multi')
  @ResponseMessage('Upload files success')
  @UseInterceptors(FilesInterceptor('files', 5, multerConfig))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() uploadFileDto: UploadFileDto,
  ): Promise<ResponseUploadFileDto[]> {
    return await this.handleMultipleUpload(files, uploadFileDto.folder);
  }

  private async handleMultipleUpload(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<ResponseUploadFileDto[]> {
    const uploadResults = await Promise.all(
      files.map((file) =>
        this.uploadService.uploadFileToCloudinary(file, folder),
      ),
    );

    return uploadResults.map((uploaded) =>
      this.mapCloudinaryResponse(uploaded),
    );
  }

  private mapCloudinaryResponse(uploaded: any): ResponseUploadFileDto {
    return {
      image_url: uploaded.secure_url,
      public_id: uploaded.public_id,
      resource_type: uploaded.resource_type,
    };
  }
}
