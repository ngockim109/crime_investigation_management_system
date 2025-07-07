import { Module } from '@nestjs/common';
import { CaseUserService } from './case_user.service';
import { CaseUserController } from './case_user.controller';

@Module({
  controllers: [CaseUserController],
  providers: [CaseUserService],
})
export class CaseUserModule {}
