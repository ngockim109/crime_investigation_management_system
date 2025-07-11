import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PartyService } from './parties.service';
import { ResponseMessage } from 'src/decorator/customize';
import { GetPartiesFilterDto } from './dto/get-parties-filter.dto';

@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Post()
  create() {}

  @Get()
  @ResponseMessage('Parties retrieved successfully')
  async findAllParties(
    @Query() filterDto: GetPartiesFilterDto,
  ) {
    return this.partyService.findAllParties(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partyService.update(id, updatePartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyService.remove(id);
  }
}
