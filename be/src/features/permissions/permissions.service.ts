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

  async create(createPermissionDto: CreatePermissionDto) {
    const { description, apiPath, method, module } = createPermissionDto;

    const isExist = await this.permissionRepository.findOne({
      where: { apiPath, method },
    });

    if (isExist) {
      throw new BadRequestException(`Permission with apiPath=${apiPath}, method=${method} already exists!`);
    }

    const newPermission = this.permissionRepository.save({
      description,
      apiPath,
      method,
      module,
    });

    return newPermission;

  }

  findAll() {
    return `This action returns all permissions`;
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
