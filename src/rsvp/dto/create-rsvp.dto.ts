import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateRsvpDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

