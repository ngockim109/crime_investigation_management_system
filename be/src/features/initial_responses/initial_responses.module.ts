import { Module } from '@nestjs/common';
import { InitialResponsesService } from './initial_responses.service';
import { InitialResponsesController } from './initial_responses.controller';

@Module({
  controllers: [InitialResponsesController],
  providers: [InitialResponsesService],
})
export class InitialResponsesModule {}
