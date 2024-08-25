import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AddParticipate, CreateBetDto } from "src/dto/bet.dto";
import { Bet, BetParticipant } from "@prisma/client";

@Injectable()
export class BetService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }

    async createBet(data: CreateBetDto): Promise<Bet> {
        try {
            const user = await this.userService.findOrCreateUser(data.user);

            const bet = await this.prisma.bet.create({
                data: {
                    creatorId: user.id,
                    betName: data.betName,
                    description: data.description,
                    source: data.source,
                    minimumBetAmount: data.minimumBetAmount,
                    totalAmount: data.totalAmount,
                }
            });

            return bet;
        } catch (error) {
            console.error("Error in createBet:", error);
            if (error instanceof InternalServerErrorException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to create bet: ${error.message}`);
        }
    }


    async addParticipant(data: AddParticipate): Promise<BetParticipant> {
        // Step 1: Check if user exists
        const user = await this.userService.getUserByEmail(data.email);
        if (!user) {
            throw new BadRequestException('Invalid email');
        }

        const bet = await this.prisma.bet.findFirst({
            where: {
                id: data.betId,
            },
        });
        if (!bet) {
            throw new BadRequestException('Invalid bet ID');
        }

        const currentTime = new Date();
        const betDeadline = new Date(bet.betDeadline);
        if (currentTime >= betDeadline) {
            throw new BadRequestException('Betting is closed for this bet');
        }

        const existingParticipant = await this.prisma.betParticipant.findFirst({
            where: {
                betId: data.betId,
                userId: user.id,
            },
        });
        if (existingParticipant) {
            throw new BadRequestException('User has already participated in this bet');
        }

        const participant = await this.prisma.betParticipant.create({
            data: {
                betId: data.betId,
                userId: user.id,
                amount: data.amount,
                squadMultisigAddress: data.squadMultisigAddress
            },
        });

        return participant;
    }
}
