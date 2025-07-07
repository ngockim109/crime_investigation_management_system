import { PartialType } from '@nestjs/mapped-types';
import { CreateInitialResponseDto } from './create-initial_response.dto';

export class UpdateInitialResponseDto extends PartialType(CreateInitialResponseDto) {}
