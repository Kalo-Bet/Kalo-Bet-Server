import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/dto/user.dto";

@Controller("api/user")
export class UserController {
   constructor(private readonly userService: UserService){}

    @Post()
    async createOrFindUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.findOrCreateUser(createUserDto);
    }

    @Get('findUserByEmail')
    async getUser(@Query('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }
}