import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from 'src/users/users.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dtos/create-profile.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    if (await this.userRepository.findOne({ where: { email } }))
      throw new ConflictException('Email is already registered');

    // hash password
    registerDto.password = await bcrypt.hash(password, 12);

    // create user instance
    const newUser = this.userRepository.create({ ...registerDto });

    // create and save profile
    const newProfile = await this.profileService.create({ ...registerDto });

    // save user
    newUser.profile = newProfile;
    return this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid email or password');

    const { password: plainPassword, ...payload } = user;
    return { ...payload };
  }
}
