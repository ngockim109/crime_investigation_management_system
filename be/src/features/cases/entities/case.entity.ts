/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  CrimeType,
  RelationIncidentType,
  SeverityType,
} from 'src/common/enum/report.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CaseStatusType } from 'src/common/enum/case.enum';
import { Report } from 'src/features/reports/entities/report.entity';
import { InitialResponse } from 'src/features/initial_responses/entities/initial_response.entity';
import { CaseUser } from 'src/features/case_user/entities/case_user.entity';
import { PhysicalEvidence } from 'src/features/physical_evidences/entities/physical_evidence.entity';
import { SceneMedia } from 'src/features/scene_medias/entities/scene_media.entity';
import { InitialStatement } from 'src/features/initial_statements/entities/initial_statement.entity';
import { Party } from 'src/features/parties/entities/party.entity';

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn('uuid')
  case_id: string;

  @Column({ type: 'enum', enum: CrimeType })
  crime_type: CrimeType;

  @Column({ type: 'enum', enum: SeverityType })
  severity: SeverityType;

  @Column({ type: 'timestamp', nullable: true })
  time_occurrence: Date;

  @Column({ type: 'enum', enum: RelationIncidentType })
  relation_incident: RelationIncidentType;

  @Column({ type: 'varchar', length: 255 })
  case_location: string;

  @Column({
    type: 'enum',
    enum: CaseStatusType,
    default: CaseStatusType.NEW,
  })
  case_status: CaseStatusType;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToOne(() => InitialResponse, (initialResponse) => initialResponse.case)
  initial_response: InitialResponse;

  @OneToMany(() => Report, (report) => report.case)
  reports: Report[];

  @OneToMany(() => CaseUser, (caseUser) => caseUser.case)
  case_users: CaseUser[];

  @OneToMany(() => PhysicalEvidence, (evidence) => evidence.case)
  physical_evidences: PhysicalEvidence[];

  @OneToMany(() => SceneMedia, (sceneMedia) => sceneMedia.case)
  scene_medias: SceneMedia[];

  @OneToMany(() => InitialStatement, (statement) => statement.case)
  initial_statements: InitialStatement[];

  @OneToMany(() => Party, (party) => party.case)
  parties: Party[];
}
