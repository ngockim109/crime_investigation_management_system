import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { EvidenceModule } from '../evidences/evidences.module';
import { PartyModule } from '../parties/parties.module';
import { CasesModule } from '../cases/cases.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), 
  PartyModule, EvidenceModule, 
  forwardRef(() => CasesModule)
],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
