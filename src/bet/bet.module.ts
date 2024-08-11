import { Module } from '@nestjs/common';
import { BetService } from './bet.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { BetController } from './bet.controller';

@Module({
  providers: [BetService],
  controllers: [BetController],
  imports: [PrismaModule, UserModule]
})
export class BetModule {}
