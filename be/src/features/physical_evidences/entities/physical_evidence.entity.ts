import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Case } from 'src/features/cases/entities/case.entity';
import { User } from 'src/features/users/entities/user.entity';

@Entity('physical_evidence')
export class PhysicalEvidence {
  @PrimaryGeneratedColumn('uuid')
  physical_evidence_id: string;

  @Column({ type: 'varchar', length: 10 })
  identification_code: string;

  @Column({ type: 'varchar', length: 255 })
  scene_location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  collected_time: Date;

  @Column({ type: 'text' })
  scene_description: string;

  @Column({ type: 'text' })
  initial_condition: string;

  @Column({ type: 'text' })
  preservation_measures: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  case_id: string;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.physical_evidences, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'case_id' })
  case: Case;

  @Column({ type: 'varchar', length: 50, nullable: true })
  collector_username: string;

  @ManyToOne(() => User, (user) => user.collected_evidences, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'collector_username'})
  collector: User;
}
