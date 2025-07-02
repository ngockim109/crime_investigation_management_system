import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
// import { Case } from '../../cases/entities/case.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  report_id: string;

  @Column({
    type: 'enum',
    enum: [
      'theft',
      'assault',
      'fraud',
      'vandalism',
      'harassment',
      'white-collar',
      'cyber-crime',
      'drug-related',
      'public-order',
      'other',
    ],
  })
  crime_type: string;

  @Column({ type: 'enum', enum: ['minor', 'moderate', 'serious', 'critical'] })
  severity: string;

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
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  officer_approve_id: string;

  @Column({ type: 'uuid', nullable: true })
  case_id: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'officer_approve_id' })
  officer: User;

  //   @ManyToOne(() => Case, { nullable: true })
  //   @JoinColumn({ name: 'case_id' })
  //   case: Case;
}
