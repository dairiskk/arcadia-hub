import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Ensure UserModule is imported
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; // Create this strategy

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'test', // Ensure this is defined in your .env
            signOptions: { expiresIn: '60h' }, // Token expiration time
        }),
        UserModule, // Import UserModule to access UserService
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule], // Export for guards
})
export class AuthModule { }
