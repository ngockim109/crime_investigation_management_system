import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';

@Entity('scene_medias')
export class SceneMedia {
  @PrimaryGeneratedColumn('uuid')
  scene_media_id: string;

  @Column({ type: 'timestamp' })
  date_taken: Date;

  @Column({ type: 'json', nullable: true })
  scene_media_file: ResponseUploadFileDto[];

  @Column({ type: 'text' })
  scene_media_description: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  captured_by: string;
  @ManyToOne('User', 'scene_medias', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'captured_by' })
  captured_by_user: any;

  @Column({ type: 'uuid', nullable: true })
  case_id: string;

  @ManyToOne('Case', 'scene_medias', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'case_id' })
  case: any;
}
