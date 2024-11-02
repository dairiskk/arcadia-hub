import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Adjust the path based on your structure
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const { password, ...result } = user; // Exclude the password from the returned user
                return result;
            }
        }

        return null; // Return null if user is not found or passwords do not match
    }


    async login(authDto: AuthDto) {
        const user = await this.validateUser(authDto.email, authDto.password);
        console.log(user)
        if (!user) {
            throw new Error('Invalid credentials'); // You may want to throw a custom exception
        }
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
