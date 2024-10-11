import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envs } from './config';

// entities
import { User } from './typeorm/entities/User';
import { Role } from './typeorm/entities/Role';
import { Review } from './typeorm/entities/Review';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Profile } from './typeorm/entities/Profile';
import { ProfileModule } from './profile/profile.module';

import { JwtModule } from '@nestjs/jwt';
import { TokenInterceptor } from './common/interceptors/token.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or 'postgres', 'mssql', etc.
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      entities: [User, Profile, Role, Review],
      synchronize: true,
    }),

    UsersModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
