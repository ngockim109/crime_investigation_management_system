import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>
  ) { }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    try {
      const { description, api_path, method, module } = createPermissionDto;

      const isExist = await this.permissionRepository.findOne({
        where: { api_path, method },
      });

      if (isExist) {
        throw new BadRequestException(`Permission with apiPath=${api_path}, method=${method} already exists!`);
      }

      const newPermission = this.permissionRepository.save({
        description,
        api_path,
        method,
        module,
      });

      return newPermission;
    } catch (error) {
      throw new BadRequestException('Failed to create permission: ' + error.message);
    }

  }

  async findAllGroupByModule() {
    const permissions = await this.permissionRepository.find();

    const grouped = {};
    for (const permission of permissions) {
      const key = permission.module;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(permission);
    }

    return grouped;
  }


  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
