import { Module } from '@nestjs/common';
import { CaseUserService } from './case_user.service';
import { CaseUserController } from './case_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseUser } from './entities/case_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseUser])],
  controllers: [CaseUserController],
  providers: [CaseUserService],
})
export class CaseUserModule {}
