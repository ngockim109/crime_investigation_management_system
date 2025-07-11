import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Case } from '../../cases/entities/case.entity';
import { User } from '../../users/entities/user.entity';

@Entity('physical_evidences')
export class PhysicalEvidence {
  @PrimaryGeneratedColumn('uuid')
  physical_evidence_id: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  identification_code: string;

  @Column({ type: 'varchar', length: 255 })
  scene_location: string;

  @Column({ type: 'timestamp' })
  collected_time: Date;

  @Column({ type: 'text' })
  scene_description: string;

  @Column({ type: 'text' })
  initial_condition: string;

  @Column({ type: 'text' })
  preservation_measures: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  case_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  collector_username: string;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.physical_evidences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'case_id' })
  case: Case;

  @ManyToOne(() => User, (user) => user.collected_evidences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'collector_username' })
  collector: User;
}
