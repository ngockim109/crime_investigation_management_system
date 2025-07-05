import { Module } from '@nestjs/common';
import { InitialStatementsService } from './initial_statements.service';
import { InitialStatementsController } from './initial_statements.controller';

@Module({
  controllers: [InitialStatementsController],
  providers: [InitialStatementsService],
})
export class InitialStatementsModule {}
