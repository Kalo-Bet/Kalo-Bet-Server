import { IsString, IsBoolean, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateOddBetDto {
  @IsString()
  condition: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  betCondition: string;

  @IsBoolean()
  isBetAvialable: boolean;

  @IsDateString()
  betDeadline: string;

  @IsNumber()
  forOdd: number;

  @IsNumber()
  againstOdd: number;

  @IsOptional()
  @IsString()
  category?: string;
}

export class CreateOddBetWithUserDto {
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

  bet: CreateOddBetDto;
}