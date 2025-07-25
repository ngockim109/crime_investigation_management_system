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
import { AuthModule } from './features/auth/auth.module';
import { RolesModule } from './features/roles/roles.module';
import { PermissionsModule } from './features/permissions/permissions.module';
import { Role } from './features/roles/entities/role.entity';
import { Permission } from './features/permissions/entities/permission.entity';
import { Case } from './features/cases/entities/case.entity';
import { InitialResponse } from './features/initial_responses/entities/initial_response.entity';
import { CaseUser } from './features/case_user/entities/case_user.entity';
import { PhysicalEvidence } from './features/physical_evidences/entities/physical_evidence.entity';
import { SceneMedia } from './features/scene_medias/entities/scene_media.entity';
import { InitialStatement } from './features/initial_statements/entities/initial_statement.entity';
import { PreservationMeasure } from './features/preservation_measures/entities/preservation_measure.entity';
import { MedicalSupport } from './features/medical_supports/entities/medical_support.entity';
import { DatabasesModule } from './features/databases/databases.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          User,
          Party,
          Evidence,
          Report,
          Role,
          Permission,
          Case,
          InitialResponse,
          CaseUser,
          PhysicalEvidence,
          SceneMedia,
          InitialStatement,
          PreservationMeasure,
          MedicalSupport,
        ],
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
    AuthModule,
    RolesModule,
    PermissionsModule,
    DatabasesModule,
  ],
})
export class AppModule {}
