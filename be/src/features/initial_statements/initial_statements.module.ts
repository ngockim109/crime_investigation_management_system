import { Module } from '@nestjs/common';
import { InitialStatementsService } from './initial_statements.service';
import { InitialStatementsController } from './initial_statements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitialStatement } from './entities/initial_statement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InitialStatement])],
  controllers: [InitialStatementsController],
  providers: [InitialStatementsService],
})
export class InitialStatementsModule {}
