import { Body, Controller, Get, InternalServerErrorException, Post, Put, Query } from "@nestjs/common";
import { Bet, OddsBet } from "@prisma/client";
import { CreateUserAndBetDto } from "../dto/create-bet.dto";
import { BetService } from "./bet.service";
import { CreateOddBetWithUserDto } from "../dto/create-odd-bet.dto";
import { BetOpponentWithUserDto } from "../dto/bet-opponent.dto";
import { UserDetailsDto } from "../dto/user-details.dto";

@Controller("api/bet")
export class BetController {
    constructor(private readonly betService: BetService){}

    @Post()
    async addBet(@Body() data: CreateUserAndBetDto): Promise<Bet>{
        const bet = await this.betService.createBet(data)
        return bet
    }

    @Post("odds")
    async addOddBet(@Body() data: CreateOddBetWithUserDto): Promise<OddsBet>{
        const bet = await this.betService.createOddBet(data)
        return bet
    }

    @Get('findBetById')
    async getBet(@Query('id') betId: string){
        const bet = await this.betService.getBetById(betId)
        return bet
    }

    @Put()
    async addBetOpponent(@Body() data: BetOpponentWithUserDto): Promise<Bet>{
        const bet = await this.betService.addBetOpponent(data)
        return bet
    }

    @Get('all')
    async getAllBet(): Promise<Bet[]>{
        return this.betService.getBets()
    }

    @Get('completed')
    async getCompletedBets(): Promise<Bet[]> {
        return this.betService.getCompletedBets();
    }

    @Get('active')
    async getActiveBets(): Promise<Bet[]> {
        return this.betService.getActiveBets();
    }

    @Get('open')
    async getOpenBets(): Promise<Bet[]> {
        console.log('Received request for open bets');
        try {
            const result = await this.betService.getOpenBets();
            console.log('Successfully retrieved open bets');
            return result;
        } catch (error) {
            console.error('Error in getOpenBets controller:', error);
            throw new InternalServerErrorException('Failed to fetch open bets');
        }
    }

    @Get('odds')
    async getAllOddBet(): Promise<OddsBet[]>{
        return this.betService.getOddBets()
    }

    @Post("userBets")
    async getAllUserBet(@Body() data: UserDetailsDto){
        const bet = await this.betService.getAllUserBet(data)
        return bet
    }
}