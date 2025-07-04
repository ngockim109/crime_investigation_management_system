import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { CloudinaryProvider } from 'src/provider/cloudinary/cloudinary.config';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryProvider: CloudinaryProvider) {}

  private get cloudinary() {
    return this.cloudinaryProvider.getCloudinary();
  }

  async uploadFileToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          if (result) return resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
