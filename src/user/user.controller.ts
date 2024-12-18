import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await req.user;
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
