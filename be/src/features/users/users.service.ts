import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>
  ) { }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { userName: username },
      relations: ['role', 'role.permissions'],
    })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  updateUserToken = async (refreshToken: string, userName: string) => {
    return this.usersRepository.update({
      userName: userName
    }, {
      refreshToken: refreshToken
    })
  }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async register(user: RegisterUserDto) {
    try {
      const { userName, password, fullName, email, phoneNumber } = user;
      const isExit = await this.usersRepository.findOne({
        where: { userName: userName }
      })
      if (isExit) {
        throw new BadRequestException(`User with username "${userName}" already exists!`);
      }

      const userRole = await this.rolesRepository.findOne({
        where: { description: 'USER' }
      })

      const hashPassword = this.getHashPassword(password);
      let newRegister = await this.usersRepository.save({
        userName: userName,
        password: hashPassword,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        role: userRole!,
      })
      return newRegister;
    } catch (error) {
      throw new BadRequestException('Register user failed:' + error.message);
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
