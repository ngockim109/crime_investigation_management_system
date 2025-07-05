import { PartialType } from '@nestjs/mapped-types';
import { CreateInitialStatementDto } from './create-initial_statement.dto';

export class UpdateInitialStatementDto extends PartialType(CreateInitialStatementDto) {}
