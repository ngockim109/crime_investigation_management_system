import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { PassThrough } from 'stream';
import { Attachment } from '../evidence/interfaces/attachment.interface';
import { Multer } from 'multer';

@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(file: Multer.File, folder: string = 'default'): Promise<Attachment> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinaryService.getCloudinary().uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error || !result) return reject(error || new Error('No result from Cloudinary'));
          resolve({
            originalname: file.originalname,
            image_url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
          });
        }
      );
      const bufferStream = new PassThrough();
      bufferStream.end(file.buffer);
      bufferStream.pipe(uploadStream);
    });
  }

  async uploadMultipleFiles(files: Multer.File[], folder: string = 'default'): Promise<Attachment[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }
}