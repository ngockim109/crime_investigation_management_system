import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MedicalSupport } from 'src/features/medical_supports/entities/medical_support.entity';
import { PreservationMeasure } from 'src/features/preservation_measures/entities/preservation_measure.entity';
import { Report } from 'src/features/reports/entities/report.entity';
import { CaseUser } from 'src/features/case_user/entities/case_user.entity';
import {
  UserAccountStatusType,
  UserPositionType,
} from 'src/common/enum/user.enum';
import { PhysicalEvidence } from 'src/features/physical_evidences/entities/physical_evidence.entity';
import { SceneMedia } from 'src/features/scene_medias/entities/scene_media.entity';
import { InitialStatement } from 'src/features/initial_statements/entities/initial_statement.entity';
import { PresentStatusType } from 'src/common/enum/case_user.enum';
import { Role } from 'src/features/roles/entities/role.entity';
@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  user_name: string;

  @Column({ type: 'varchar', length: 100 })
  phone_number: string;

  @Column({ type: 'varchar', length: 100 })
  full_name: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp' })
  date_of_birth: Date;

  @Column({ type: 'timestamp' })
  day_attended: Date;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Column({ type: 'varchar', length: 100 })
  zone: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Report, (report) => report.officer)
  approvedReports: Report[];

  @OneToMany(() => PreservationMeasure, (measure) => measure.officer)
  preservation_measures: PreservationMeasure[];

  @OneToMany(() => MedicalSupport, (medical) => medical.creator)
  medical_supports: MedicalSupport[];

  @OneToMany(() => CaseUser, (caseUser) => caseUser.user)
  case_users: CaseUser[];

  @OneToMany(() => PhysicalEvidence, (evidence) => evidence.collector)
  collected_evidences: PhysicalEvidence[];

  @OneToMany(() => SceneMedia, (sceneMedia) => sceneMedia.captured_by_user)
  scene_medias: SceneMedia[];

  @OneToMany(() => InitialStatement, (statement) => statement.recorded_by_user)
  recorded_statements: InitialStatement[];

  @Column({ type: 'enum', enum: UserAccountStatusType })
  account_status: UserAccountStatusType;

  @Column({ type: 'enum', enum: PresentStatusType, default: PresentStatusType.IDLE })
  present_status: PresentStatusType;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  role: Role;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;
}
