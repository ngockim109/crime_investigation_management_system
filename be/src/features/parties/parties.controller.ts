import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PartyService } from './parties.service';

@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Post()
  create() {}

  @Get()
  findAll() {
    return this.partyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partyService.update(+id, updatePartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyService.remove(+id);
  }
}
