import { Role } from "src/features/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    permissionId: number;

    @Column()
    description: string;

    @Column()
    apiPath: string;

    @Column()
    method: string;

    @Column()
    module: string;

    // n-n roles
    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];

    @Column({ default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
