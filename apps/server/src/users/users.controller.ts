import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUser, Public } from 'src/auth/decorator';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService,) { }

  @Get()
  findAll(@GetCurrentUser() user: any) {
    return this.usersService.getAllUsers(user);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
