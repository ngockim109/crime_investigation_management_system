import { Permission } from "src/features/permissions/entities/permission.entity";
import { User } from "src/features/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    roleId: number

    @Column()
    description: string;

    // n-n permissions
    @ManyToMany(() => Permission, (permission) => permission.roles, { cascade: true })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'roleId',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'permissionId',
        },
    })
    permissions: Permission[];

    // 1-n users
    @OneToMany(() => User, (user) => user.role)
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: false })
    isDeleted: boolean;
}
