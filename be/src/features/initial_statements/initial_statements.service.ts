import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InitialStatement } from './entities/initial_statement.entity';
import { UpdateInitialStatementDto } from './dto/update-initial_statement.dto';
import { CreateInitialStatementDto } from './dto/create-initial_statement.dto';

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

  async findAllInitialStatements() {
    try {
      const result = await this.initialStatementRepository.find({ where: { is_deleted: false } });
      this.logger.log(`Fetched ${result.length} initial statements`);
      return result;
    } catch (error) {
      this.logger.error('Error fetching initial statements', error.stack);
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
      return result.map((item, idx) => ({
        id: item.initial_statements_id,
        statement_type: item.person_role,
        provider: item.provider_name,
        date: item.statement_date,
      }));
    } catch (error) {
      this.logger.error('Error fetching initial statements by case_id', error.stack);
      throw error;
    }
  }
}
