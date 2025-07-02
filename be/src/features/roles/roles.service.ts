import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const { description, permissions: permissionIds } = createRoleDto;

    const isExist = await this.roleRepository.findOne({
      where: { description },
    });
    if (isExist) {
      throw new BadRequestException(`Role with description "${description}" already exists`);
    }

    const permissions = await this.permissionRepository.findBy({
      permissionId: In(permissionIds),
    });

    const newRole = this.roleRepository.create({
      description,
      permissions,
    });

    return await this.roleRepository.save(newRole);
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { description, permissions: permissionIds } = updateRoleDto;

    const role = await this.roleRepository.findOne({
      where: { roleId: id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new BadRequestException(`Role with id "${id}" does not exist`);
    }

    if (description) {
      role.description = description;
    }

    if (permissionIds) {
      const permissions = await this.permissionRepository.findBy({
        permissionId: In(permissionIds),
      });

      if (permissions.length !== permissionIds.length) {
        const found = permissions.map(p => p.permissionId);
        const missing = permissionIds.filter(id => !found.includes(id));
        throw new BadRequestException(`Permission(s) not found: ${missing.join(', ')}`);
      }

      role.permissions = permissions;
    }

    return await this.roleRepository.save(role);
  }



  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
