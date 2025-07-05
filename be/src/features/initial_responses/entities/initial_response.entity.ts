import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Case } from 'src/features/cases/entities/case.entity';
import { MedicalSupport } from 'src/features/medical_supports/entities/medical_support.entity';
import { PreservationMeasure } from 'src/features/preservation_measures/entities/preservation_measure.entity';
@Entity('initial_responses')
export class InitialResponse {
  @PrimaryGeneratedColumn('uuid')
  initial_responses_id: string;

  @Column({ type: 'timestamp' })
  dispatching_time: Date;

  @Column({ type: 'timestamp' })
  arrival_time: Date;

  @Column({ type: 'text' })
  preliminary_assessment: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'uuid', unique: true })
  case_id: string;

  @OneToOne(() => Case, (caseEntity) => caseEntity.initial_response, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'case_id' })
  case: Case;

  @OneToMany(() => PreservationMeasure, (measure) => measure.initial_response)
  preservation_measures: PreservationMeasure[];

  @OneToMany(() => MedicalSupport, (medical) => medical.initial_response)
  medical_supports: MedicalSupport[];
}
