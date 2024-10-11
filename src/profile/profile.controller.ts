import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { updateProfileDto } from './dtos/update-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // me
  @Get('me')
  getMe() {
    return `getMe`;
  }

  @Get()
  findMany() {
    return this.profileService.findMany();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: updateProfileDto,
  ) {
    return this.profileService.update(id, updateProfileDto);
  }
}
