import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Attachment } from '../interfaces/attachment.interface';
// import { Report } from '../../report/entities/report.entity';

@Entity('evidence')
export class Evidence{
  @PrimaryGeneratedColumn('uuid')
  evidence_id: string; // PK

  // @Column()
  // report_id: number; // FK

  // @ManyToOne(() => Report)
  // @JoinColumn({ name: 'report_id' })
  // report: Report;

  @Column()
  type_evidence: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  current_location: string;

  @Column({ type: 'json', nullable: true })
  attached_file: Attachment[];

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
