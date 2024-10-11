import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';

import { User } from 'src/typeorm/entities/User';
import { UsersModule } from 'src/users/users.module';

import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: envs.JWT_SECRET, // Cung cấp secret key để ký JWT
      signOptions: { expiresIn: envs.JWT_EXPIRES }, // Tùy chọn thời gian hết hạn của JWT
    }),
    UsersModule,
    ProfileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
