/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Logger,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { GetReportsFilterDto } from './dto/get-reports-filter.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('reports')
export class ReportsController {
  private readonly logger = new Logger(ReportsController.name);

  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ResponseMessage('Report created successfully')
  async createReport(@Body() createReportDto: CreateReportDto) {
    this.logger.log('Creating report...');
    return this.reportsService.createReport(createReportDto);
  }

  @Get()
  @ResponseMessage('Reports retrieved successfully')
  async getAllReports(@Query() filterDto: GetReportsFilterDto) {
    this.logger.log(
      'Getting all reports with filters:',
      JSON.stringify(filterDto),
    );
    try {
      const result = await this.reportsService.getAllReports(filterDto);
      this.logger.log(`Found ${result.total} reports`);
      return result;
    } catch (error) {
      this.logger.error('Error getting reports:', error.message);
      throw error;
    }
  }

  @Get(':id')
  @ResponseMessage('Report retrieved successfully')
  async getReportById(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.log(`Getting report by ID: ${id}`);
    return this.reportsService.getReportById(id);
  }
}
