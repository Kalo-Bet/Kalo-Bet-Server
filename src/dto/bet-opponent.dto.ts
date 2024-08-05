import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class BetOpponentDto {
  @IsString()
  id: string;

  @IsString()
  opponentAnswer: string;

  @IsBoolean()
  opponentAllow3partyApproval: boolean;

  @IsNumber()
  opponentStakeAmount: number;
}

export class BetOpponentWithUserDto {
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

  bet: BetOpponentDto;
}