import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { INIT_PERMISSIONS } from './database.sample';
import { UserPositionType } from 'src/common/enum/user.enum';

@Injectable()
export class DatabasesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    @InjectRepository(User) private userRepository: Repository<User>,

    private configService: ConfigService,
    private userService: UsersService
  ) { }

  async onModuleInit() {
    const isInit = this.configService.get<string>("SHOULD_INIT")
    if (Boolean(isInit)) {
      const countUser = await this.userRepository.count();
      const countPermission = await this.permissionRepository.count();
      const countRole = await this.roleRepository.count();

      // create permissions
      if (countPermission === 0) {
        await this.permissionRepository.insert(INIT_PERMISSIONS);
      }

      // create roles
      if (countRole === 0) {
        const permissions = await this.permissionRepository.find();
        await this.roleRepository.insert([
          {
            description: UserPositionType.POLICE_CHIEF,
            permissions: permissions,
            isDeleted: false,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ])
      }

      // create admin user
      if (countUser == 0) {
        const adminRole = await this.roleRepository.findOne({
          where: { description: UserPositionType.POLICE_CHIEF },
          relations: ['permissions']
        });
        if (adminRole) {
          await this.userService.create({
            user_name: "admin",
            phone_number: "0123456789",
            full_name: "Admin User",
            password: "123456",
            date_of_birth: new Date(),
            day_attended: new Date(),
            status: "active",
            zone: "zone1",
            role_id: adminRole.role_id
          });
        } else {
          throw new Error("Admin role not found when creating admin user.");
        }
      }
      if (countUser > 0 && countRole > 0 && countPermission > 0) {
        console.log("Database initialized with sample data.");
      }

      // create role and permission 
      const role = await this.roleRepository.findOne({
        where: { description: UserPositionType.POLICE_CHIEF },
        relations: ['permissions']
      });
      if (!role) {
        throw new Error("Admin role not found.");
      }
      const permissions = await this.permissionRepository.find();
      if (permissions.length === 0) {
        throw new Error("No permissions found.");
      }
      role.permissions = permissions;
      await this.roleRepository.save(role);

    }
  }

}
