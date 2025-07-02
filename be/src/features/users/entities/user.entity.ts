import { Role } from 'src/features/roles/entities/role.entity';
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn({ unique: true })
    userName: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({ default: null })
    avatarUrl: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    // role_id
    @ManyToOne(() => Role, { eager: true })
    @JoinColumn({ name: 'role_id', referencedColumnName: 'roleId' }) 
    role: Role;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: 'text', nullable: true })
    refreshToken: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}