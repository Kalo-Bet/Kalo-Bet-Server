import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "src/dto/user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findOrCreateUser(createUserDto: CreateUserDto): Promise<User> {
        let user = await this.prisma.user.findFirst({
            where: {
                email: createUserDto.email,
            },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: createUserDto.email,
                    firstName: createUserDto.firstName,
                    lastName: createUserDto.lastName,
                    userAddress: createUserDto.userAddress,
                    userName: createUserDto.userName
                },
            });
        }
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    } 
}