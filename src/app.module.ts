import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BetModule } from './bet/bet.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, 
    BetModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),],
  providers: [PrismaService],
})
export class AppModule {}
