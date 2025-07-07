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
import { CasesModule } from './features/cases/cases.module';
import { InitialResponsesModule } from './features/initial_responses/initial_responses.module';
import { PreservationMeasuresModule } from './features/preservation_measures/preservation_measures.module';
import { MedicalSupportsModule } from './features/medical_supports/medical_supports.module';
import { CaseUserModule } from './features/case_user/case_user.module';
import { PhysicalEvidencesModule } from './features/physical_evidences/physical_evidences.module';
import { SceneMediasModule } from './features/scene_medias/scene_medias.module';
import { InitialStatementsModule } from './features/initial_statements/initial_statements.module';
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
    CasesModule,
    InitialResponsesModule,
    PreservationMeasuresModule,
    MedicalSupportsModule,
    CaseUserModule,
    PhysicalEvidencesModule,
    SceneMediasModule,
    InitialStatementsModule,
  ],
})
export class AppModule {}
