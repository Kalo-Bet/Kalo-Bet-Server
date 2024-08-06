import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Bet, OddsBet, Order, BetStatus, OrderStatus } from "@prisma/client";
import { UserService } from "../user/user.service";
import { CreateUserAndBetDto } from "../dto/create-bet.dto";
import { CreateOddBetWithUserDto } from "../dto/create-odd-bet.dto";
import { BetOpponentWithUserDto } from "../dto/bet-opponent.dto";
import { UserDetailsDto } from "../dto/user-details.dto";

@Injectable()
export class BetService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }

    async createBet(data: CreateUserAndBetDto): Promise<Bet> {
        try {
            const user = await this.userService.findOrCreateUser(data);

        // console.log('Creating market with data:', {
        //     title: data.bet.title,
        //     description: data.bet.description || '',
        //     outcomes: [data.bet.creatorAnswer, 'Against'],
        //     lockTime: new Date(data.bet.betDeadline).getTime() / 1000,
        //     mintAccount: mintAccount.toString(),
        // });

        // const marketResponse = await this.monacoService.createMarket({
        //     title: data.bet.title,
        //     description: data.bet.description || '',
        //     outcomes: [data.bet.creatorAnswer, 'Against'],
        //     lockTime: new Date(data.bet.betDeadline).getTime() / 1000,
        //     mintAccount: mintAccount,
        // });

        // console.log('Market creation response:', marketResponse);

        // if (!marketResponse.success) {
        //     console.error('Market creation failed:', marketResponse.error);
        //     throw new Error(`Failed to create market in Monaco Protocol: ${marketResponse.error}`);
        // }
    
            const bet = await this.prisma.bet.create({
                data: {
                    condition: data.bet.condition,
                    currency: data.bet.currency,
                    title: data.bet.title,
                    description: data.bet.description,
                    betCondition: data.bet.betCondition,
                    creatorId: user.id,
                    isBetAvialable: data.bet.isBetAvialable,
                    betDeadline: data.bet.betDeadline,
                    creatorStakeAmount: data.bet.creatorStakeAmount,
                    isBetApprove: data.bet.isBetApprove,
                    creatorAnswer: data.bet.creatorAnswer,
                    creatorName: user.userName,
                    creatorAllow3partyApproval: data.bet.creatorAllow3partyApproval,
                    betVisibilty: data.bet.betVisibilty,
                    marketPublicKey: "xdbhbdcbdhcdb",
                    status: BetStatus.OPEN,
                    category: data.bet.category,
                }
            });
    
            // await this.monacoService.openMarket(marketResponse.data.marketPk);
    
            return bet;
        } catch (error) {
            console.error("Error in createBet:", error);
            throw new Error(`Failed to create bet: ${error.message}`);
        }
    }

    async createOddBet(data: CreateOddBetWithUserDto): Promise<OddsBet> {
        try {
            const user = await this.userService.findOrCreateUser(data);

            const bet = await this.prisma.oddsBet.create({
                data: {
                    condition: data.bet.condition,
                    title: data.bet.title,
                    description: data.bet.description,
                    betCondition: data.bet.betCondition,
                    creatorId: user.id,
                    isBetAvialable: data.bet.isBetAvialable,
                    betDeadline: data.bet.betDeadline,
                    forOdd: data.bet.forOdd,
                    againstOdd: data.bet.againstOdd,
                    category: data.bet.category,
                }
            });
            return bet;
        } catch (error) {
            console.log(error);
            throw new Error("An error occurred while creating odds bet. Please check the data types.");
        }
    }

    async addBetOpponent(data: BetOpponentWithUserDto): Promise<Bet> {
        const user = await this.userService.findOrCreateUser(data);

        const bet = await this.prisma.bet.findFirst({
            where: { id: data.bet.id }
        });

        if (!bet) {
            throw new Error(`Bet with ID ${data.bet.id} not found`);
        }

        if (bet.creatorStakeAmount !== data.bet.opponentStakeAmount) {
            throw new Error(`Stake amount mismatch. Please match ${bet.creatorStakeAmount}`);
        }

        if (bet.creatorAllow3partyApproval !== data.bet.opponentAllow3partyApproval) {
            throw new Error(`The mediator must be approved by both users, contact ${bet.creatorName} for the third party approval.`);
        }

        const updatedBet = await this.prisma.bet.update({
            where: { id: data.bet.id },
            data: {
                opponentAnswer: data.bet.opponentAnswer,
                opponentAllow3partyApproval: data.bet.opponentAllow3partyApproval,
                opponentId: user.id,
                opponentName: user.userName,
                opponentStakeAmount: data.bet.opponentStakeAmount
            }
        });

        return updatedBet;
    }

    async getBetById(betId: string): Promise<Bet | null> {
        return await this.prisma.bet.findUnique({ where: { id: betId } });
    }

    async getBets(): Promise<Bet[]> {
        try {
            return await this.prisma.bet.findMany({
                where: {
                    betVisibilty: 'public'
                }
            });
        } catch (error) {
            console.error('Error retrieving bets:', error);
            throw new Error('Failed to retrieve bets');
        }
    }

    async getOpenBets(): Promise<Bet[]> {
        return this.prisma.bet.findMany({
            where: {
                OR: [
                    { opponentId: null },
                    { creatorId: null }
                ]
            }
        });
    }

    async getActiveBets(): Promise<Bet[]> {
        return this.prisma.bet.findMany({
            where: {
                status: BetStatus.OPEN
            }
        });
    }

    async getCompletedBets(): Promise<Bet[]> {
        return this.prisma.bet.findMany({
            where: {
                status: BetStatus.SETTLED
            }
        });
    }

    // async getCompletedBets(): Promise<Bet[]> {
    //     return await this.prisma.bet.findMany({
    //         where: {
    //             AND: [
    //                 { creatorId: { not: null } },
    //                 { opponentId: { not: null } }
    //             ]
    //         }
    //     });
    // }

    async getOddBets(): Promise<OddsBet[]> {
        try {
            return await this.prisma.oddsBet.findMany();
        } catch (error) {
            console.error('Error retrieving odds bets:', error);
            throw new Error('Failed to retrieve odds bets');
        }
    }

    async getAllUserBet(data: UserDetailsDto): Promise<Bet[]> {
        try {
            const user = await this.userService.findOrCreateUser(data);

            return await this.prisma.bet.findMany({
                where: {
                    OR: [
                        { creatorId: user.id },
                        { opponentId: user.id }
                    ]
                }
            });
        } catch (error) {
            console.log(error);
            throw new Error("Failed to retrieve user bets");
        }
    }

    // async settleBet(betId: string, winningOutcome: number): Promise<void> {
    //     const bet = await this.prisma.bet.findUnique({ where: { id: betId } });
    //     if (!bet) throw new Error('Bet not found');

    //     const settleResponse = await this.monacoService.settleMarket(new PublicKey(bet.marketPublicKey), winningOutcome);

    //     if (!settleResponse.success) {
    //         throw new Error("Failed to settle market in Monaco Protocol");
    //     }

    //     await this.prisma.bet.update({
    //         where: { id: betId },
    //         data: {
    //             status: BetStatus.SETTLED,
    //             winningOutcome,
    //         },
    //     });
    // }

    // async cancelBet(betId: string): Promise<Bet> {
    //     const bet = await this.prisma.bet.findUnique({ where: { id: betId } });
    //     if (!bet) throw new Error('Bet not found');

    //     const voidResponse = await this.monacoService.voidMarket(new PublicKey(bet.marketPublicKey));

    //     if (!voidResponse.success) {
    //         throw new Error("Failed to void market in Monaco Protocol");
    //     }

    //     return await this.prisma.bet.update({
    //         where: { id: betId },
    //         data: {
    //             status: BetStatus.VOIDED,
    //         },
    //     });
    // }

    // async provideLiquidity(betId: string, amount: number): Promise<void> {
    //     const bet = await this.prisma.bet.findUnique({ where: { id: betId } });
    //     if (!bet) throw new Error('Bet not found');

    //     await this.monacoService.provideLiquidity(new PublicKey(bet.marketPublicKey), amount);

    //     await this.prisma.bet.update({
    //         where: { id: betId },
    //         data: {
    //             liquidity: {
    //                 increment: amount,
    //             },
    //         },
    //     });
    // }

    // async getMarketPrices(betId: string): Promise<any> {
    //     const bet = await this.prisma.bet.findUnique({ where: { id: betId } });
    //     if (!bet) throw new Error('Bet not found');

    //     return await this.monacoService.getMarketPrices(new PublicKey(bet.marketPublicKey));
    // }
}