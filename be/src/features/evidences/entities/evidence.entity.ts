import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Report } from 'src/features/reports/entities/report.entity';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';
import { EvidenceType } from 'src/common/enum/evidence.enum';
// import { Report } from '../../report/entities/report.entity';

@Entity('evidence')
export class Evidence {
  @PrimaryGeneratedColumn('uuid')
  evidence_id: string; // PK

  @Column({ type: 'uuid', nullable: true })
  report_id: string; // FK

  @ManyToOne(() => Report)
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @Column({ type: 'enum', enum: EvidenceType })
  type_evidence: EvidenceType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  current_location: string;

  @Column({ type: 'json', nullable: true })
  attached_file: ResponseUploadFileDto[];

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
