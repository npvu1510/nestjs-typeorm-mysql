import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { updateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  getMe() {}

  create(createProfileDto: CreateProfileDto) {
    const newProfile = this.profileRepository.create({
      ...createProfileDto,
      first_name: createProfileDto.firstName,
      last_name: createProfileDto.lastName,
      date_of_birth: createProfileDto.dateOfBirth,
    });

    return this.profileRepository.save(newProfile);
  }

  findMany() {
    return this.profileRepository.find();
  }

  async findOneById(id: number) {
    const profile = await this.profileRepository.findOne({ where: { id } });

    if (!profile)
      throw new NotFoundException(`Profile with id #${id} not found`);

    return profile;
  }

  async update(id: number, updateProfileDto: updateProfileDto) {
    await this.findOneById(id);
    await this.profileRepository.update({ id }, updateProfileDto);

    return this.findOneById(id);
  }
}
