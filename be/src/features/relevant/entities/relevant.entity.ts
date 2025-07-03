import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum RelevantType {
  WITNESS = 'witness',
  VICTIM = 'victim',
  SUSPECT = 'suspect',
  ACCOMPLICE = 'accomplice',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity({ name: 'relevant_parties' })
export class Relevant {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  relevant_id: number;

  @Column({ type: 'varchar', length: 100 })
  full_name: string;

  @Column({ type: 'enum', enum: RelevantType })
  type_relevant: RelevantType;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'varchar', length: 100 })
  nationality: string;

  @Column({ type: 'text' })
  statement: string;

  @Column({ type: 'json', nullable: true })
  attachments_url: string[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => Report, (report) => report.relevant_parties, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @Column({ type: 'bigint', nullable: true })
  report_id: number;
}
