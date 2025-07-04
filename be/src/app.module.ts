import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './features/users/users.module';
import { User } from './features/users/entities/user.entity';
import { CloudinaryModule } from './provider/cloudinary/cloudinary.module';
import { ReportsModule } from './features/reports/reports.module';
import { Report } from './features/reports/entities/report.entity';
import { Party } from './features/parties/entities/party.entity';
import { Evidence } from './features/evidences/entities/evidence.entity';
import { UploadModule } from './features/files/files.module';
import { EvidenceModule } from './features/evidences/evidences.module';
import { PartyModule } from './features/parties/parties.module';
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
        entities: [User, Party, Evidence, Report],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ReportsModule,
    UsersModule,
    PartyModule,
    UploadModule,
    EvidenceModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
