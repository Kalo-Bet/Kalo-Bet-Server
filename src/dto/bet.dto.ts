import {
  IsString,
  IsNumber,
  IsOptional,
  IsEmail,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  walletAddress: string;

  @IsOptional()
  @IsString()
  userName?: string;
}

export class CreateBetDto {
  @IsString()
  betName: string;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  minimumBetAmount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}

export class AddParticipate {
  @IsUUID()
  betId: string

  @IsNumber()
  amount: number

  @IsString()
  squadMultisigAddress: string

  @IsString()
  email: string
}
