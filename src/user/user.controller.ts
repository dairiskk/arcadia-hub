import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, UnauthorizedException, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getProfile(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return req.user;
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ schema: { example: { email: 'user@example.com', password: 'password123', name: 'John Doe' } } })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password' | 'id'>> {
    const user = await this.userService.createUser(createUserDto);
    const { password, id, ...result } = user;
    return result;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ schema: { example: { email: 'user@example.com', password: 'newpassword123', name: 'John Doe' } } })
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
