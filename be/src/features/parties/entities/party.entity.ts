import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenderType, PartyType } from 'src/common/enum/party.enum';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';
import { Report } from 'src/features/reports/entities/report.entity';
import { Case } from 'src/features/cases/entities/case.entity';
@Entity({ name: 'parties' })
export class Party {
  @PrimaryGeneratedColumn('uuid')
  parties_id: string;

  @Column({ type: 'varchar', length: 100 })
  full_name: string;

  @Column({ type: 'enum', enum: PartyType })
  type_Party: PartyType;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column({ type: 'varchar', length: 100 })
  nationality: string;

  @Column({ type: 'text' })
  statement: string;

  @Column({ type: 'json', nullable: true })
  attachments_url: ResponseUploadFileDto[];

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  report_id: string;

  @ManyToOne(() => Report, (report) => report.parties, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @Column({ type: 'uuid', nullable: true })
  case_id: string;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.parties, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'case_id' })
  case: Case;
}
