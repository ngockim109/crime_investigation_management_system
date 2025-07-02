/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { GetReportsFilterDto } from './dto/get-reports-filter.dto';
import { ReportStatus } from 'src/common/enum/report.enum';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async createReport(createReportDto: CreateReportDto): Promise<Report> {
    try {
      const report = this.reportRepository.create({
        ...createReportDto,
        status: ReportStatus.PENDING,
        is_deleted: false,
      });

      const savedReport = await this.reportRepository.save(report);
      this.logger.log(`Created report with ID: ${savedReport.report_id}`);
      return savedReport;
    } catch (error) {
      this.logger.error('Error creating report:', error.message);
      throw error;
    }
  }

  async getAllReports(filterDto: GetReportsFilterDto) {
    try {
      this.logger.log('Filter DTO received:', JSON.stringify(filterDto));

      const {
        status,
        crime_type,
        severity,
        created_from,
        created_to,
        page = '1',
        limit = '10',
        email,
      } = filterDto;

      const queryBuilder = this.reportRepository
        .createQueryBuilder('report')
        .leftJoinAndSelect('report.officer', 'officer')
        .where('report.is_deleted = :isDeleted', { isDeleted: false });

      // Only add filters if they have actual values (not empty strings)
      if (email && email.toString().trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new BadRequestException('Invalid email format');
        }

        queryBuilder.andWhere('report.reporter_email = :email', { email });
        this.logger.log(`Added email filter: ${email}`);
      }
      if (status && status.toString().trim() !== '') {
        queryBuilder.andWhere('report.status = :status', { status });
        this.logger.log(`Added status filter: ${status}`);
      }

      if (crime_type && crime_type.toString().trim() !== '') {
        queryBuilder.andWhere('report.crime_type = :crimeType', {
          crimeType: crime_type,
        });
        this.logger.log(`Added crime_type filter: ${crime_type}`);
      }

      if (severity && severity.toString().trim() !== '') {
        queryBuilder.andWhere('report.severity = :severity', { severity });
        this.logger.log(`Added severity filter: ${severity}`);
      }

      if (
        created_from &&
        created_from.toString().trim() !== '' &&
        created_to &&
        created_to.toString().trim() !== ''
      ) {
        queryBuilder.andWhere('report.reported_at BETWEEN :from AND :to', {
          from: new Date(created_from.toString()),
          to: new Date(created_to.toString()),
        });
        this.logger.log(
          `Added date range filter: ${created_from} to ${created_to}`,
        );
      }

      const pageNumber = Math.max(1, Number.parseInt(page.toString()) || 1);
      const limitNumber = Math.max(
        1,
        Math.min(100, Number.parseInt(limit.toString()) || 10),
      );
      const skip = (pageNumber - 1) * limitNumber;

      queryBuilder.skip(skip).take(limitNumber);
      queryBuilder.orderBy('report.reported_at', 'DESC');

      this.logger.log(`Query: ${queryBuilder.getQuery()}`);
      this.logger.log(
        `Parameters: ${JSON.stringify(queryBuilder.getParameters())}`,
      );

      const [reports, total] = await queryBuilder.getManyAndCount();

      const result = {
        data: reports,
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      };

      this.logger.log(`Query executed successfully. Found ${total} reports`);
      return result;
    } catch (error) {
      this.logger.error('Error in getAllReports:', error.message);
      this.logger.error('Stack trace:', error.stack);
      throw error;
    }
  }

  async getReportById(id: string): Promise<Report> {
    try {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        throw new BadRequestException('Invalid report ID format');
      }
      const report = await this.reportRepository.findOne({
        where: {
          report_id: id,
          is_deleted: false,
        },
        relations: ['officer'],
      });

      if (!report) {
        throw new NotFoundException(`Report with ID ${id} not found`);
      }

      this.logger.log(`Found report with ID: ${id}`);
      return report;
    } catch (error) {
      this.logger.error(`Error getting report by ID ${id}:`, error.message);
      throw error;
    }
  }
}
