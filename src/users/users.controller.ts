import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindOneByEmailDto } from './dtos/find-one-by-email.dto';
import { response } from 'src/utils/response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create() {
    return this.usersService.createAdmin();
  }
  @Get()
  findMany() {
    return response(this.usersService.findMany());
  }

  @Get()
  findOneByEmail(@Body('email') findOneByEmailDto: FindOneByEmailDto) {
    const { email } = findOneByEmailDto;
    return response(this.usersService.findOneByEmail(email));
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return response(this.usersService.findOneById(+id));
  }
}
