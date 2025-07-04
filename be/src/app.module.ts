import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './features/users/users.module';
import { User } from './features/users/entities/user.entity';
import { Relevant } from './features/relevant/entities/relevant.entity';
import { RelevantModule } from './features/relevant/relevant.module';
import { UploadModule } from './features/upload/upload.module';
import { Evidence } from './features/evidence/entities/evidence.entity';
import { EvidenceModule } from './features/evidence/evidence.module';
import { CloudinaryModule } from './provider/cloudinary/cloudinary.module';
import { ReportsModule } from './features/reports/reports.module';
import { Report } from './features/reports/entities/report.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT', 3306),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Relevant, Evidence, Report],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ReportsModule,
    UsersModule,
    RelevantModule,
    UploadModule,
    EvidenceModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
