import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service'; // Adjust the path based on your structure

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
            secretOrKey: process.env.JWT_SECRET || 'test', // Same secret as in the module
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findOne(payload.sub); // Check database
        if (!user) {
            throw new UnauthorizedException('User does not exist'); // Ensure guard throws an error
        }
        return user; // User is valid
    }
}
