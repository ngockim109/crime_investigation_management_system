import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/features/users/entities/user.entity';
import { Case } from 'src/features/cases/entities/case.entity';
import { PresentStatusType } from 'src/common/enum/case_user.enum';

@Entity('case_user')
export class CaseUser {
  @PrimaryColumn({ type: 'uuid' })
  case_id: string;

  @PrimaryColumn({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Case, (caseEntity) => caseEntity.case_users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'case_id' })
  case: Case;

  @ManyToOne(() => User, (user) => user.case_users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
