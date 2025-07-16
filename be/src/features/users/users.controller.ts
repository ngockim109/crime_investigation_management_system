import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Public,
  ResponseMessage,
  SkipCheckPermission,
  User,
} from 'src/decorator/customize';
import ParseUserFilterPipe from './validation_pipe/ParseUserFilterPipe';
import { GetUserFilter } from './dto/get-reports-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @SkipCheckPermission()
  @ResponseMessage('Create a new user')
  @SkipCheckPermission()
  create(@Body() createUserDto: CreateUserDto, @User() user: any) {
    console.log('User creating:', user);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ResponseMessage('Get all users')
  @SkipCheckPermission()
  findAll(@Query(new ParseUserFilterPipe()) getUserFilter: GetUserFilter) {
    return this.usersService.GetUserByFilter(getUserFilter);
  }

  @Get(':user_name')
  @SkipCheckPermission()
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Patch(':user_name')
  @ResponseMessage('Update user information')
  @SkipCheckPermission()
  update(
    @Param('user_name') user_name: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user_name, updateUserDto);
  }

  @Delete(':user_name')
  @ResponseMessage('Delete user')
  @SkipCheckPermission()
  remove(@Param('user_name') user_name: string) {
    return this.usersService.remove(user_name);
  }
}
