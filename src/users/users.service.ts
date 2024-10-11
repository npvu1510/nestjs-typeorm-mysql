import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createAdmin() {
    return `createAdmin`;
  }

  findMany() {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    const foundUser = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!foundUser)
      throw new NotFoundException(`User with id #${id} not found`);

    return foundUser;
  }

  async findOneByEmail(email: string) {
    const foundUser = await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!foundUser)
      throw new NotFoundException(`User with email #${email} not found`);

    return await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
  }
}
