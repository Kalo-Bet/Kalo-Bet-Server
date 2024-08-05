import { IsString, IsBoolean, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateBetDto {
  @IsString()
  condition: string;

  @IsString()
  currency: string;

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
  creatorStakeAmount: number;

  @IsBoolean()
  isBetApprove: boolean;

  @IsString()
  creatorAnswer: string;

  @IsBoolean()
  creatorAllow3partyApproval: boolean;

  @IsString()
  betVisibilty: 'public' | 'private';

  @IsOptional()
  @IsString()
  category?: string;
}

export class CreateUserAndBetDto {
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

  bet: CreateBetDto;
}