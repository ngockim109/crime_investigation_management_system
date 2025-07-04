import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { RelevantModule } from '../relevant/relevant.module';
import { EvidenceModule } from '../evidence/evidence.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), RelevantModule, EvidenceModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
