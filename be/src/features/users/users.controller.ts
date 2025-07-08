import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('tạo thành công')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':user_name')
  @ResponseMessage('tìm thành công')
  findOne(@Param('user_name') user_name: string) {
    return this.usersService.findOne(user_name);
  }

  @Patch(':user_name')
  update(
    @Param('user_name') user_name: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user_name, updateUserDto);
  }

  @Delete(':user_name')
  remove(@Param('user_name') user_name: string) {
    return this.usersService.remove(+user_name);
  }
}
