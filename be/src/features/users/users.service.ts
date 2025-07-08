/* eslint-disable no-useless-catch */
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
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find({
        select: ['user_name'],
        order: { user_name: 'ASC' },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(user_name: string) {
    const checkIsExist = await this.usersRepository.findOneBy({
      user_name: user_name,
    });
    if (!checkIsExist) {
      throw new BadRequestException(`User with id ${user_name} does not exist`);
    }
    return await this.usersRepository.findOneBy({
      user_name: user_name,
    });
  }

  async update(user_name: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(
      {
        user_name: user_name,
      },
      {
        ...updateUserDto,
      },
    );
  }

  remove(user_name: number) {
    return `This action removes a #${user_name} user`;
  }
}
