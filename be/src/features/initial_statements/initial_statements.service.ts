import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InitialStatement } from './entities/initial_statement.entity';
import { UpdateInitialStatementDto } from './dto/update-initial_statement.dto';
import { CreateInitialStatementDto } from './dto/create-initial_statement.dto';
import { GetInitialStatementsFilterDto } from './dto/get-initial_statements-filter.dto';

export interface PaginatedInitialStatementResult {
  data: InitialStatement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
@Injectable()
export class InitialStatementsService {
  private readonly logger = new Logger(InitialStatementsService.name);

  constructor(
    @InjectRepository(InitialStatement)
    private readonly initialStatementRepository: Repository<InitialStatement>,
  ) {}

  async createInitialStatements(createInitialStatementDto: CreateInitialStatementDto) {
    try {
      const entity = this.initialStatementRepository.create(createInitialStatementDto);
      const saved = await this.initialStatementRepository.save(entity);
      this.logger.log(`Created initial statement with id: ${saved.initial_statements_id}`);
      return saved;
    } catch (error) {
      this.logger.error('Error creating initial statement', error.stack);
      throw error;
    }
  }
  async findAllInitialStatements(
    filterDto: GetInitialStatementsFilterDto,
  ): Promise<PaginatedInitialStatementResult> {
    try {
      this.logger.log('Filter DTO received:', JSON.stringify(filterDto));

      const {
        provider_name,
        recorded_by,
        case_id,
        date_from,
        date_to,
        page = '1',
        limit = '10',
      } = filterDto;

      const queryBuilder = this.initialStatementRepository
        .createQueryBuilder('initial_statement')
        .leftJoinAndSelect('initial_statement.recorded_by_user', 'recorded_by_user')
        .leftJoinAndSelect('initial_statement.case', 'case')
        .where('initial_statement.is_deleted = :isDeleted', {
          isDeleted: false,
        });

      if (provider_name && provider_name.toString().trim() !== '') {
        queryBuilder.andWhere('initial_statement.provider_name ILIKE :providerName', {
          providerName: `%${provider_name}%`,
        });
        this.logger.log(`Added provider_name filter: ${provider_name}`);
      }

      if (recorded_by && recorded_by.toString().trim() !== '') {
        queryBuilder.andWhere('recorded_by_user.username = :recordedBy', {
          recordedBy: recorded_by,
        });
        this.logger.log(`Added recorded_by filter: ${recorded_by}`);
      }

      if (case_id && case_id.toString().trim() !== '') {
        queryBuilder.andWhere('initial_statement.case_id = :caseId', {
          caseId: case_id,
        });
        this.logger.log(`Added case_id filter: ${case_id}`);
      }

      if (
        date_from &&
        date_from.toString().trim() !== '' &&
        date_to &&
        date_to.toString().trim() !== ''
      ) {
        queryBuilder.andWhere(
          'initial_statement.statement_date BETWEEN :from AND :to',
          {
            from: new Date(date_from.toString()),
            to: new Date(date_to.toString()),
          },
        );
        this.logger.log(`Added date range filter: ${date_from} to ${date_to}`);
      }

      const pageNumber = Math.max(1, Number.parseInt(page.toString()) || 1);
      const limitNumber = Math.max(
        1,
        Math.min(100, Number.parseInt(limit.toString()) || 10),
      );
      const skip = (pageNumber - 1) * limitNumber;

      queryBuilder.skip(skip).take(limitNumber);
      queryBuilder.orderBy('initial_statement.statement_date', 'DESC');

      this.logger.log(`Query: ${queryBuilder.getQuery()}`);
      this.logger.log(
        `Parameters: ${JSON.stringify(queryBuilder.getParameters())}`,
      );

      const [initialStatements, total] = await queryBuilder.getManyAndCount();

      const result = {
        data: initialStatements,
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      };

      this.logger.log(
        `Query executed successfully. Found ${total} initial statements`,
      );
      return result;
    } catch (error) {
      this.logger.error('Error in getAllInitialStatements:', error.message);
      this.logger.error('Stack trace:', error.stack);
      throw error;
    }
  }

  async findOneInitialStatements(id: string) {
    try {
      const result = await this.initialStatementRepository.findOne({ where: { initial_statements_id: id, is_deleted: false } });
      if (!result) this.logger.warn(`Initial statement not found with id: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error fetching initial statement with id: ${id}`, error.stack);
      throw error;
    }
  }

  async updateInitialStatements(id: string, updateInitialStatementDto: UpdateInitialStatementDto) {
    try {
      await this.initialStatementRepository.update(id, updateInitialStatementDto);
      const updated = await this.initialStatementRepository.findOne({ where: { initial_statements_id: id } });
      this.logger.log(`Updated initial statement with id: ${id}`);
      return updated;
    } catch (error) {
      this.logger.error(`Error updating initial statement with id: ${id}`, error.stack);
      throw error;
    }
  }

  async removeInitialStatements(id: string) {
    try {
      await this.initialStatementRepository.update(id, { is_deleted: true });
      this.logger.log(`Soft deleted initial statement with id: ${id}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Error deleting initial statement with id: ${id}`, error.stack);
      throw error;
    }
  }

  async findByCaseId(case_id: string) {
    try {
      const result = await this.initialStatementRepository.find({
        where: { case_id, is_deleted: false },
        order: { statement_date: 'ASC' },
      });
      if (!result) this.logger.warn(`Scene media not found with id: ${case_id}`);
      return result
    } catch (error) {
      this.logger.error('Error fetching initial statements by case_id', error.stack);
      throw error;
    }
  }
}
