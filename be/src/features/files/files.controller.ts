import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './files.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { multerConfig } from 'src/core/config/multer.config';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('cloud-multi')
  @Public()
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
      files.map(async (file) => {
        const uploaded = await this.uploadService.uploadFileToCloudinary(file, folder);
        return this.mapCloudinaryResponse(uploaded, file.originalname);
      }),
    );

    return uploadResults;
  }

  private mapCloudinaryResponse(uploaded: any, originalName: string): ResponseUploadFileDto {
    return {
      original_name: originalName,
      file_url: uploaded.secure_url,
      public_id: uploaded.public_id,
      resource_type: uploaded.resource_type,
    };
  }
}
