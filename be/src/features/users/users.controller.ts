import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, SkipCheckPermission } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Public()
  @SkipCheckPermission()
  @ResponseMessage("Create a new user")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ResponseMessage("Get all users")
  @Public()
  @SkipCheckPermission()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Get(':username')
  findOneByUsername(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username)
  }

  @Patch(':user_name')
  @ResponseMessage("Update user information")
  @Public()
  @SkipCheckPermission()
  update(@Param('user_name') user_name: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user_name, updateUserDto);
  }


  @Delete(':user_name')
  @ResponseMessage("Delete user")
  @Public()
  @SkipCheckPermission()
  remove(@Param('user_name') user_name: string) {
    return this.usersService.remove(user_name);
  }
}
