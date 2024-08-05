import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // private prisma: PrismaClient;

    // constructor() {
    //     this.prisma = new PrismaClient();
    // }

    async onModuleInit() {
        try {
            await this.$connect();
            console.log('Prisma connected successfully');
        } catch (error) {
            console.error('Prisma connection error:', error);
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Prisma disconnected successfully');
    }

    async enableShutdownHooks(app: INestApplication) {
        const shutdownFunction = async () => {
            try {
                await app.close();
            } catch (error) {
                console.error('Error closing application:', error);
            }
        };

        process.on('SIGINT', shutdownFunction);
        process.on('SIGTERM', shutdownFunction);
    }
}