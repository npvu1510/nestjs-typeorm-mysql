import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindOneByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
