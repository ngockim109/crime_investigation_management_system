import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCaseUserDto } from './dto/create-case_user.dto';
import { UpdateCaseUserDto } from './dto/update-case_user.dto';
import { CaseUser } from './entities/case_user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import aqp from 'api-query-params';
import { plainToInstance } from 'class-transformer';
import { CaseDto, CaseUserViewDto } from './dto/create-user-response.dto';
import { User } from '../users/entities/user.entity';
import { PresentStatusType } from 'src/common/enum/case_user.enum';
import { ICaseDto } from 'src/common/types/case-response.interface';
import { Case } from '../cases/entities/case.entity';
import { CaseDetailDto } from '../cases/dto/case-response.dto';

type CreateCaseUserResult = {
  user_name: string;
  case_id: string;
  status: 'created' | 'exists';
  message?: string;
  data?: any;
  full_name?: string;
  crime_type?: string;
  role?: string
};

@Injectable()
export class CaseUserService {
  // constructor(
  //   @InjectRepository(CaseUser) private userCaseRepository: Repository<CaseUser>,
  // ) { }
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(CaseUser)
    private readonly userCaseRepository: Repository<CaseUser>,

  ) { }


  // async create(createCaseUserDto: CreateCaseUserDto[]) {
  //   const results: CreateCaseUserResult[] = [];

  //   for (const dto of createCaseUserDto) {
  //     const { case_id, user_name } = dto;

  //     const exists = await this.userCaseRepository.findOne({
  //       where: { case_id, user_name },
  //       relations: ['user', 'user.role', 'case'],
  //     });

  //     if (exists) {
  //       results.push({
  //         user_name,
  //         case_id,
  //         status: 'exists',
  //         message: `User ${user_name} already exists in case ${case_id}`,
  //         full_name: exists.user?.full_name,
  //         crime_type: exists.case?.crime_type,
  //       });
  //       continue;
  //     }


  //     const newRecord = this.userCaseRepository.create(dto);
  //     await this.userCaseRepository.save(newRecord);


  //     const savedWithRelations = await this.userCaseRepository.findOne({
  //       where: { case_id, user_name },
  //       relations: ['user', 'user.role', 'case'],
  //     });

  //     results.push({
  //       user_name,
  //       case_id,
  //       status: 'created',
  //       data: savedWithRelations,
  //       full_name: savedWithRelations?.user?.full_name,
  //       crime_type: savedWithRelations?.case?.crime_type,
  //       role: savedWithRelations?.user?.role?.description,
  //     });
  //   }

  //   return results;
  // }

  async create(createCaseUserDto: CreateCaseUserDto[]) {
    const results: CreateCaseUserResult[] = [];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const dto of createCaseUserDto) {
        const { case_id, user_name } = dto;

        const exists = await queryRunner.manager.findOne(CaseUser, {
          where: { case_id, user_name },
          relations: ['user', 'user.role', 'case'],
        });

        if (exists) {
          results.push({
            user_name,
            case_id,
            status: 'exists',
            message: `User ${user_name} already exists in case ${case_id}`,
            full_name: exists.user?.full_name,
            crime_type: exists.case?.crime_type,
          });
          continue;
        }

        const newRecord = queryRunner.manager.create(CaseUser, dto);
        await queryRunner.manager.save(CaseUser, newRecord);

        await queryRunner.manager.update(
          User,
          { user_name },
          { present_status: PresentStatusType.ON_ABOVE_CASE }
        );

        const savedWithRelations = await queryRunner.manager.findOne(CaseUser, {
          where: { case_id, user_name },
          relations: ['user', 'user.role', 'case'],
        });

        results.push({
          user_name,
          case_id,
          status: 'created',
          data: savedWithRelations,
          full_name: savedWithRelations?.user?.full_name,
          crime_type: savedWithRelations?.case?.crime_type,
          role: savedWithRelations?.user?.role?.description,
        });
      }

      await queryRunner.commitTransaction();
      return results;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Transaction failed: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  // async findAll(currentPage: number, limit: number, qs: string) {
  //   const { filter, sort, population } = aqp(qs);
  //   delete filter.current;
  //   delete filter.pageSize;
  //   let offset = (+currentPage - 1) * (+limit);
  //   let defaultLimit = +limit ? +limit : 10;
  //   const totalItems = (await this.userCaseRepository.find(filter)).length;
  //   const totalPages = Math.ceil(totalItems / defaultLimit);

  //   const queryBuilder = this.userCaseRepository.createQueryBuilder('user_case')
  //     .leftJoinAndSelect('user_case.user', 'user')
  //     .leftJoinAndSelect('user_case.case', 'case')
  //     .leftJoinAndSelect('user.role', 'role')
  //     .where(filter)
  //     .skip(offset)
  //     .take(defaultLimit);

  //   if (sort && typeof sort === 'object') {
  //     Object.keys(sort).forEach((key) => {
  //       const value = sort[key];
  //       if (value === 1) {
  //         queryBuilder.addOrderBy(`user_case.${key}`, 'ASC');
  //       } else if (value === -1) {
  //         queryBuilder.addOrderBy(`user_case.${key}`, 'DESC');
  //       }
  //     });
  //   }

  //   queryBuilder.select([
  //     'user.user_name',
  //     'user.full_name',
  //     'user.present_status',
  //     'user.phone_number',
  //     'user.zone',
  //     'role.description'
  //   ]);

  //   const result = await queryBuilder.getMany();
  //   return {
  //     meta: {
  //       current: currentPage, //trang hiện tại
  //       pageSize: limit, //số lượng bản ghi đã lấy
  //       pages: totalPages,  //tổng số trang với điều kiện query
  //       total: totalItems // tổng số phần tử (số bản ghi)
  //     },
  //     result //kết quả query
  //   }
  // }

  findOne(id: number) {
    return `This action returns a #${id} caseUser`;
  }

  update(id: number, updateCaseUserDto: UpdateCaseUserDto) {
    return `This action updates a #${id} caseUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} caseUser`;
  }

  async getUsersByCaseId(caseId: string): Promise<CaseUserViewDto[]> {
    try {
      const caseUsers = await this.userCaseRepository.find({
        where: { case_id: caseId, is_deleted: false },
        relations: ['user', 'user.role'],
      });

      return plainToInstance(CaseUserViewDto, caseUsers, { excludeExtraneousValues: true });
    } catch (error) {
      throw error
    }

  }

  async getUsersByUserId(username: string): Promise<ICaseDto[]> {
    try {
      const caseUsers = await this.userCaseRepository.find({
        where: { user_name: username, is_deleted: false },
        relations: ['case', 'case.reports'],
      });

      const data = caseUsers.map(item => item.case);

      return plainToInstance(CaseDetailDto, data, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error;
    }
  }


}