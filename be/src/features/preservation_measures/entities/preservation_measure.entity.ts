import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InitialResponse } from 'src/features/initial_responses/entities/initial_response.entity';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';
import { User } from 'src/features/users/entities/user.entity';

@Entity('preservation_measures')
export class PreservationMeasure {
  @PrimaryGeneratedColumn('uuid')
  preservation_measures_id: string;

  @Column({ type: 'time' })
  arrival_start_time: string;

  @Column({ type: 'time' })
  arrival_end_time: string;

  @Column({ type: 'text' })
  protection_methods: string;

  @Column({ type: 'text' })
  area_covered: string;

  @Column({ type: 'text' })
  special_instructions: string;

  @Column({ type: 'json', nullable: true })
  attached_file: ResponseUploadFileDto[];

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  responsible_officer: string;

  @ManyToOne(() => User, (user) => user.preservation_measures, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'responsible_officer' })
  officer: User;

  @Column({ type: 'uuid', nullable: true })
  initial_responses_id: string;

  @ManyToOne(() => InitialResponse, (initialResponse) => initialResponse.preservation_measures, {
      onDelete: 'CASCADE',
    })
  @JoinColumn({ name: 'initial_responses_id' })
  initial_response: InitialResponse;
}
