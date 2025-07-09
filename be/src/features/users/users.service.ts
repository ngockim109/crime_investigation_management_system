import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(user_name: string) {
    const checkIsExist = await this.usersRepository.findOneBy({ user_name });
    if (!checkIsExist) {
      throw new BadRequestException(`User with user_name ${user_name} does not exist`);
    }
    return checkIsExist;
  }

  async update(user_name: string, updateUserDto: UpdateUserDto) {
    const checkIsExist = await this.usersRepository.findOneBy({ user_name });
    if (!checkIsExist) {
      throw new BadRequestException(`User with user_name ${user_name} does not exist`);
    }
    await this.usersRepository.update(user_name, { ...updateUserDto });
    return this.usersRepository.findOneBy({ user_name });
  }

  async remove(user_name: string) {
    const checkIsExist = await this.usersRepository.findOneBy({ user_name });
    if (!checkIsExist) {
      throw new BadRequestException(`User with user_name ${user_name} does not exist`);
    }
    await this.usersRepository.update(user_name, { is_deleted: true });
    return { success: true };
  }
}
