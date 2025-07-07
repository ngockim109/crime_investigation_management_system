import { Entity, Column, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MedicalSupport } from 'src/features/medical_supports/entities/medical_support.entity';
import { PreservationMeasure } from 'src/features/preservation_measures/entities/preservation_measure.entity';
import { Report } from 'src/features/reports/entities/report.entity';
import { CaseUser } from 'src/features/case_user/entities/case_user.entity';
import { UserAccountStatusType, UserPositionType } from 'src/common/enum/user.enum';
import { PhysicalEvidence } from 'src/features/physical_evidences/entities/physical_evidence.entity';
import { SceneMedia } from 'src/features/scene_medias/entities/scene_media.entity';
import { InitialStatement } from 'src/features/initial_statements/entities/initial_statement.entity';
import { PresentStatusType } from 'src/common/enum/case_user.enum';
@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  user_name: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserPositionType })
  position: UserPositionType;

  @Column({ type: 'timestamp'})
  date_of_birth: Date;

  @Column({ type: 'timestamp'})
  day_attended: Date;

  @Column({ type: 'enum', enum: UserAccountStatusType })
  account_status: UserAccountStatusType;

  @Column({ type: 'enum', enum: PresentStatusType })
  present_status: PresentStatusType;

  @Column({ type: 'enum', enum: PresentStatusType })
  role_in_case: PresentStatusType; // ?? 

  @Column({ type: 'varchar', length: 100 })
  phone_number: string;

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
}
