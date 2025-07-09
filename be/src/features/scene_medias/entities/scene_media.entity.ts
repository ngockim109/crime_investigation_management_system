import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Case } from 'src/features/cases/entities/case.entity';
import { User } from 'src/features/users/entities/user.entity';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';

@Entity('scene_medias')
export class SceneMedia {
  @PrimaryGeneratedColumn('uuid')
  scene_media_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_taken: Date;

  @Column({ type: 'json', nullable: true })
  scene_media_file: ResponseUploadFileDto;

  @Column({ type: 'text' })
  scene_media_description: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  captured_by: string;

  @ManyToOne(() => User, (user) => user.scene_medias, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'captured_by'})
  captured_by_user: User;

  @Column({ type: 'uuid', nullable: true })
  case_id: string;
  
  @ManyToOne(() => Case, (caseEntity) => caseEntity.scene_medias, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'case_id' })
  case: Case;
}
