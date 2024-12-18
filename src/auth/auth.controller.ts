import { Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ schema: { example: { email: 'user@example.com', password: 'password123' } } })
  async login(@Request() req) {
    if(!await this.authService.validateUser(req.body.email, req.body.password))
        return new UnauthorizedException();
    return this.authService.login(req.body);
  }
}
