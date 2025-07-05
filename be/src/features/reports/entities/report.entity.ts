import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import {
  CrimeType,
  RelationIncidentType,
  ReportStatusType,
  SeverityType,
} from 'src/common/enum/report.enum';
import { User } from '../../users/entities/user.entity';
import { Evidence } from 'src/features/evidences/entities/evidence.entity';
import { Party } from 'src/features/parties/entities/party.entity';
import { Case } from 'src/features/cases/entities/case.entity';
@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  report_id: string;

  @Column({ type: 'enum', enum: CrimeType })
  crime_type: CrimeType;

  @Column({ type: 'enum', enum: SeverityType })
  severity: SeverityType;

  @Column({ type: 'timestamp', nullable: true })
  time_occurrence: Date;

  @Column({ type: 'enum', enum: RelationIncidentType })
  relation_incident: RelationIncidentType;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  case_location: string;

  @CreateDateColumn()
  reported_at: Date;

  @Column({ type: 'varchar', length: 100 })
  reporter_fullname: string;

  @Column({ type: 'varchar', length: 100 })
  reporter_email: string;

  @Column({ type: 'text', nullable: true })
  reporter_phonenumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  suspect_fullname: string;

  @Column({ type: 'text', nullable: true })
  physical_description: string;

  @Column({ type: 'text', nullable: true })
  contact_information: string;

  @Column({ type: 'text', nullable: true })
  means_of_transport: string;

  @Column({
    type: 'enum',
    enum: ReportStatusType,
    default: ReportStatusType.PENDING,
  })
  status: ReportStatusType;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  officer_approve_id: string;

  @ManyToOne(() => User, (user) => user.approvedReports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'officer_approve_id' })
  officer: User;

  @Column({ type: 'uuid', nullable: true })
  case_id: string;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.reports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'case_id' })
  case: Case;

  @OneToMany(() => Party, (party) => party.report)
  parties: Party[];

  @OneToMany(() => Evidence, (evidence) => evidence.report)
  evidences: Evidence[];
}
