import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { StorageEngine } from 'multer';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  private cloudinaryInstance: typeof cloudinary;
  private cloudinaryStorage: StorageEngine;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.cloudinaryInstance = cloudinary;
    this.cloudinaryInstance.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });

    this.cloudinaryStorage = new CloudinaryStorage({
      cloudinary: this.cloudinaryInstance,
      params: {
        folder: 'evidence',
        resource_type: 'auto',
      } as any,
    });
  }

  getCloudinary() {
    return this.cloudinaryInstance;
  }

  getStorage() {
    return this.cloudinaryStorage;
  }

  getStorageWithCustomParams(params: any) {
    return new CloudinaryStorage({
      cloudinary: this.cloudinaryInstance,
      params: params as any,
    });
  }
} 