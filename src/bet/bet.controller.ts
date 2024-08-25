import { Body, Controller, Get, InternalServerErrorException, Post, Put, Query } from "@nestjs/common";
import { BetService } from "./bet.service";
import { CreateBetDto } from "../dto/bet.dto";
import { Bet } from "@prisma/client";

@Controller("bet")
export class BetController {
    constructor(private readonly betService: BetService){}

    @Post()
    async addBet(@Body() data: CreateBetDto): Promise<Bet>{
        const bet = await this.betService.createBet(data)
        return bet
    }
}