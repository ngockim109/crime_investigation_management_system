import { PartialType } from '@nestjs/mapped-types';
import { CreateRelevantDto } from './create-relevant.dto';

export class UpdateRelevantDto extends PartialType(CreateRelevantDto) {}
