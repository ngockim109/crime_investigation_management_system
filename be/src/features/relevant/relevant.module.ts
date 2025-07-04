import { Module } from '@nestjs/common';
import { RelevantService } from './relevant.service';
import { RelevantController } from './relevant.controller';
import { Relevant } from './entities/relevant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Relevant])],
  controllers: [RelevantController],
  providers: [RelevantService],
  exports: [RelevantService]
})
export class RelevantModule {}
