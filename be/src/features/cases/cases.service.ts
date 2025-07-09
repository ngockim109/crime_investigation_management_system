import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './entities/case.entity';
import { EntityManager, Repository } from 'typeorm';
import { Report } from '../reports/entities/report.entity';
import { PaginatedCasesResult } from 'src/common/types/case-response.interface';
import { plainToInstance } from 'class-transformer';
import { InitialResponseDetail } from 'src/common/types/initial-response.interface';
import { InitialResponseDetailDto } from '../initial_responses/dto/initial-response-detail.dto';
import { GetCasesFilterDto } from './dto/get-case-filter.dto';
import { CaseDetailDto } from './dto/case-response.dto';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private caseRepository: Repository<Case>,
  ) {}

  async createCaseFromReport(
    report: Report,
    manager: EntityManager,
  ): Promise<Case> {
    try {
      const caseData = {
        crime_type: report.crime_type,
        severity: report.severity,
        time_occurrence: report.time_occurrence,
        relation_incident: report.relation_incident,
        case_location: report.case_location,
      };

      const newCase = this.caseRepository.create(caseData);
      const savedCase = await manager.save(newCase);

      return savedCase;
    } catch (error) {
      throw error;
    }
  }

  async getAllCasesWithReports(
    filter: GetCasesFilterDto,
  ): Promise<PaginatedCasesResult> {
    const {
      search,
      status,
      type_of_crime,
      level_of_severity,
      from_date,
      to_date,
      page = 1,
      limit = 10,
    } = filter;

    const query = this.caseRepository
      .createQueryBuilder('case')
      .leftJoinAndSelect('case.reports', 'report')
      .where('case.is_deleted = false');

    if (search) {
      query.andWhere(
        `
        case.case_id LIKE :search 
        OR report.reporter_fullname LIKE :search 
        OR case.case_location LIKE :search
      `,
        { search: `%${search}%` },
      );
    }

    if (status) {
      query.andWhere('case.case_status = :status', { status });
    }

    if (type_of_crime) {
      query.andWhere('case.crime_type = :type_of_crime', { type_of_crime });
    }

    if (level_of_severity) {
      query.andWhere('case.severity = :level_of_severity', {
        level_of_severity,
      });
    }

    if (from_date && to_date) {
      query.andWhere('case.time_occurrence BETWEEN :from AND :to', {
        from: from_date,
        to: to_date,
      });
    }

    const [cases, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const result = {
      data: plainToInstance(CaseDetailDto, cases, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
    return result;
  }

  async findCaseById(caseId: string): Promise<InitialResponseDetail> {
    try {
      const foundCase = await this.caseRepository.findOne({
        where: {
          case_id: caseId,
          is_deleted: false,
        },
        relations: [
          'initial_response',
          'initial_response.preservation_measures',
          'initial_response.medical_supports',
        ],
      });

      if (!foundCase || !foundCase.initial_response) {
        throw new NotFoundException(
          `Initial response for case ID ${caseId} not found`,
        );
      }

      return plainToInstance(
        InitialResponseDetailDto,
        foundCase.initial_response,
        { excludeExtraneousValues: true },
      );
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
