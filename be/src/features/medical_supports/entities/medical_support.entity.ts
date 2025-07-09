import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InitialResponse } from 'src/features/initial_responses/entities/initial_response.entity';
import { User } from 'src/features/users/entities/user.entity';
import { MedicalType } from 'src/common/enum/medical.enum';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';

@Entity('medical_supports')
export class MedicalSupport {
  @PrimaryGeneratedColumn('uuid')
  medical_supports_id: string;

  @Column({ type: 'varchar', length: 50 })
  medical_unit_id: string; // input or generated

  @Column({ type: 'enum', enum: MedicalType })
  support_type: MedicalType;

  @Column({ type: 'varchar', length: 100 })
  personnel_assigned: string; // relation with user ??

  @Column({ type: 'text' })
  location_assigned: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ type: 'json', nullable: true })
  scene_sketch_file: ResponseUploadFileDto;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  initial_responses_id: string;

  @ManyToOne(() => InitialResponse, (initialResponse) => initialResponse.medical_supports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'initial_responses_id' })
  initial_response: InitialResponse;

  @Column({ type: 'varchar', length: 50, nullable: true })
  created_by: string;

  @ManyToOne(() => User, (user) => user.medical_supports, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by' })
  creator: User;
}
