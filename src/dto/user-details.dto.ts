import { IsString } from 'class-validator';

export class UserDetailsDto {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  userAddress: string;

  @IsString()
  userName: string;
}