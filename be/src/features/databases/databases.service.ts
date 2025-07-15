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

  // async onModuleInit() {
  //   const isInit = this.configService.get<string>("SHOULD_INIT")
  //   if (Boolean(isInit)) {
  //     const countUser = await this.userRepository.count();
  //     const countPermission = await this.permissionRepository.count();
  //     const countRole = await this.roleRepository.count();

  //     // create permissions
  //     if (countPermission === 0) {
  //       await this.permissionRepository.insert(INIT_PERMISSIONS);
  //     }

  //     // create roles
  //     if (countRole === 0) {
  //       const permissions = await this.permissionRepository.find();
  //       await this.roleRepository.insert([
  //         {
  //           description: 'Admin',
  //           permissions: permissions,
  //           isDeleted: false,
  //           created_at: new Date(),
  //           updated_at: new Date(),
  //         }
  //       ])
  //     }

  //     // create admin user
  //     if (countUser == 0) {
  //       const adminRole = await this.roleRepository.findOne({
  //         where: { description: 'Admin' },
  //         relations: ['permissions']
  //       });
  //       if (adminRole) {
  //         await this.userService.create({
  //           user_name: "admin",
  //           phone_number: "0123456789",
  //           full_name: "Admin User",
  //           password: "123456",
  //           date_of_birth: new Date(),
  //           day_attended: new Date(),
  //           status: "active",
  //           zone: "zone1",
  //           role_id: adminRole.role_id
  //         });
  //       } else {
  //         throw new Error("Admin role not found when creating admin user.");
  //       }
  //     }
  //     if (countUser > 0 && countRole > 0 && countPermission > 0) {
  //       console.log("Database initialized with sample data.");
  //     }

  //     // create role and permission 
  //     const role = await this.roleRepository.findOne({
  //       where: { description: 'Admin' },
  //       relations: ['permissions']
  //     });
  //     if (!role) {
  //       throw new Error("Admin role not found.");
  //     }
  //     const permissions = await this.permissionRepository.find();
  //     if (permissions.length === 0) {
  //       throw new Error("No permissions found.");
  //     }
  //     role.permissions = permissions;
  //     await this.roleRepository.save(role); 

  //   }
  // }

  async onModuleInit() {
    const isInit = this.configService.get<string>("SHOULD_INIT");
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
        ]);
      }

      // create admin user
      if (countUser === 0) {
        const adminRole = await this.roleRepository.findOne({
          where: { description: UserPositionType.POLICE_CHIEF },
          relations: ['permissions']
        });

        if (adminRole) {
          await this.userService.create({
            user_name: "police_chief",
            phone_number: "0123456789",
            full_name: "POLICE CHIEF",
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
      const adminRole = await this.roleRepository.findOne({
        where: { description: UserPositionType.POLICE_CHIEF },
        relations: ['permissions']
      });

      if (!adminRole) {
        throw new Error("Admin role not found.");
      }

      const allPermissions = await this.permissionRepository.find();
      if (allPermissions.length === 0) {
        throw new Error("No permissions found.");
      }

      adminRole.permissions = allPermissions;
      await this.roleRepository.save(adminRole);

      // Create CENSOR role if not exists and assign specific permissions
      const existingCensor = await this.roleRepository.findOne({
        where: { description: UserPositionType.CENSOR },
        relations: ['permissions']
      });

      if (!existingCensor) {
        const censorPermissions = await this.permissionRepository.find({
          where: [
            {
              description: 'Update Report',
              api_path: '/api/reports/:id',
              method: 'PATCH',
              module: 'REPORT',
              isDeleted: false
            },
            {
              description: 'Get All Report',
              api_path: '/api/reports',
              method: 'GET',
              module: 'REPORT',
              isDeleted: false
            }
          ]
        });

        if (censorPermissions.length < 2) {
          throw new Error("One or more required permissions for CENSOR not found.");
        }

        const censorRole = this.roleRepository.create({
          description: UserPositionType.CENSOR,
          permissions: censorPermissions,
          isDeleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        });

        await this.roleRepository.save(censorRole);
        console.log("CENSOR role created with REPORT permissions.");
      }
      // Create INVESTIGATOR role if not exists and assign specific permissions
      const existingInvestigator = await this.roleRepository.findOne({
        where: { description: UserPositionType.INVESTIGATOR },
        relations: ['permissions']
      });

      if (!existingInvestigator) {
        const investigatorModulePermissions = await this.permissionRepository.find({
          where: [
            { module: 'PHYSICAL-EVIDENCES', isDeleted: false },
            { module: 'PRESERVATION-MEASURE', isDeleted: false },
            { module: 'SCENE-MEDIA', isDeleted: false },
            { module: 'INITIAL-STATEMENT', isDeleted: false },
            { module: 'MEDICAL-SUPPORT', isDeleted: false },
            { module: 'INITIAL-RESPONSE', isDeleted: false }
          ]
        });
        const caseUserPermission = await this.permissionRepository.findOne({
          where: {
            permission_id: '0e68519f-52b6-42ad-8650-bf53d830ec6d'
          }
        });

        const investigatorPermissions = caseUserPermission
          ? [...investigatorModulePermissions, caseUserPermission]
          : investigatorModulePermissions;

        if (investigatorPermissions.length === 0) {
          throw new Error("No permissions found for INVESTIGATOR role.");
        }

        const investigatorRole = this.roleRepository.create({
          description: UserPositionType.INVESTIGATOR,
          permissions: investigatorPermissions,
          isDeleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        });

        await this.roleRepository.save(investigatorRole);
        console.log("INVESTIGATOR role created with related module permissions.");
      }

    }
  }

}
