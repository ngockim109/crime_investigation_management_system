import { UserPositionType } from "src/common/enum/user.enum";
import { Permission } from "src/features/permissions/entities/permission.entity";
import { User } from "src/features/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    role_id: string


    @Column({ type: 'enum', enum: UserPositionType })
    description: UserPositionType;

    // n-n permissions
    @ManyToMany(() => Permission, (permission) => permission.roles, { cascade: true })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'role_id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'permission_id',
        },
    })
    permissions: Permission[];

    // 1-n users
    @OneToMany(() => User, (user) => user.role)
    users: User[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default: false })
    isDeleted: boolean;
}
