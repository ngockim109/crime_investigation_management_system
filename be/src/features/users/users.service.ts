import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { Role } from '../roles/entities/role.entity';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>
  ) { }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { user_name: username },
      relations: ['role', 'role.permissions']
    })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  updateUserToken = async (refreshToken: string, userName: string) => {
    return this.usersRepository.update({
      user_name: userName
    }, {
      refreshToken: refreshToken
    })
  }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  // async register(user: RegisterUserDto) {
  //   try {
  //     const { userName, password, fullName, email, phoneNumber } = user;
  //     const isExit = await this.usersRepository.findOne({
  //       where: { userName: userName }
  //     })
  //     if (isExit) {
  //       throw new BadRequestException(`User with username "${userName}" already exists!`);
  //     }

  //     const userRole = await this.rolesRepository.findOne({
  //       where: { description: 'USER' }
  //     })

  //     const hashPassword = this.getHashPassword(password);
  //     let newRegister = await this.usersRepository.save({
  //       userName: userName,
  //       password: hashPassword,
  //       fullName: fullName,
  //       email: email,
  //       phoneNumber: phoneNumber,
  //       role: userRole!,
  //     })
  //     return newRegister;
  //   } catch (error) {
  //     throw new BadRequestException('Register user failed:' + error.message);
  //   }
  // }

  async create(createUserDto: CreateUserDto) {
    try {
      const { user_name, phone_number, full_name, password, position, date_of_birth, day_attended, status, zone,
        //  role_id
      } = createUserDto;

      const isExist = await this.usersRepository.findOne({
        where: { user_name: user_name }
      })
      if (isExist) {
        throw new BadRequestException(`User with username "${user_name}" already exists!`);
      }

      const hashPassword = this.getHashPassword(password);

      // const userRole = await this.rolesRepository.findOne({
      //   where: { role_id: role_id }
      // });

      // if (!userRole) {
      //   throw new BadRequestException(`Role with id "${role_id}" does not exist!`);
      // }
      const newUser = await this.usersRepository.save({
        user_name,
        phone_number,
        full_name,
        password: hashPassword,
        position,
        date_of_birth,
        day_attended,
        status,
        zone,
        // role: userRole,
      });
      return newUser;
    } catch (error) {
      throw new BadRequestException('Create user failed: ' + error.message);
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.usersRepository.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const queryBuilder = this.usersRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where(filter)
      .skip(offset)
      .take(defaultLimit);

    if (sort && typeof sort === 'object') {
      Object.entries(sort).forEach(([key, value]) => {
        queryBuilder.addOrderBy(`user.${key}`, value === -1 ? 'DESC' : 'ASC');
      });
    }

    queryBuilder.select([
      'user.user_name',
      'user.phone_number',
      'user.full_name',
      'user.position',
      'user.date_of_birth',
      'user.day_attended',
      'user.status',
      'user.zone',
      'user.refreshToken',
      'role',
      'permissions'
    ]);

    const result = await queryBuilder.getMany();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }



  async update(user_name: string, updateUserDto: UpdateUserDto) {
    const { phone_number, full_name, password, position, date_of_birth, day_attended, status, zone } = updateUserDto;
    const updateUser = await this.usersRepository.update(
      { user_name: user_name },
      {
        ...updateUserDto,
        phone_number: phone_number,
        full_name: full_name,
        position: position,
        date_of_birth: date_of_birth,
        day_attended: day_attended,
        status: status,
        zone: zone,
      }
    );

    if (updateUser.affected === 0) {
      throw new BadRequestException(`User with username "${user_name}" does not exist!`);
    }
    if (password) {
      const hashPassword = this.getHashPassword(password);
      await this.usersRepository.update(
        { user_name: user_name },
        { password: hashPassword }
      );
    }

    return this.usersRepository.findOne({
      where: { user_name: user_name },
      relations: ['role', 'role.permissions'],
    });
  }

  async remove(user_name: string) {
    const deleteUser = await this.usersRepository.update({
      user_name: user_name
    }, {
      is_deleted: true
    })
    if (deleteUser.affected === 0) {
      throw new BadRequestException(`User with username "${user_name}" does not exist!`);
    }
    return deleteUser
  }
}
