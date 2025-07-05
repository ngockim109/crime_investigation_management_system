import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Case } from 'src/features/cases/entities/case.entity';
import { User } from 'src/features/users/entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { PartyType } from 'src/common/enum/party.enum';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';

@Entity('initial_statements')
export class InitialStatement {
  @PrimaryGeneratedColumn('uuid')
  initial_statements_id: string;

  @Column({ type: 'varchar', length: 100 })
  provider_name: string; 

  @Column({ type: 'timestamp' })
  statement_date: Date;

  @Column({ type: 'varchar', length: 255 })
  contact_info: string;

  @Column({ type: 'enum', enum: PartyType })
  person_role: PartyType;

  @Column({ type: 'text' })
  statement_content: string; 

  @Column({ type: 'json', nullable: true })
  evidence_file_path: ResponseUploadFileDto;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  recorded_by: string;

  @ManyToOne(() => User, (user) => user.recorded_statements, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'recorded_by' })
  recorded_by_user: User;

  @Column({ type: 'uuid', nullable: true })
  case_id: string;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.initial_statements, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'case_id' })
  case: Case;
}
