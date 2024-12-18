import { Injectable, ConflictException } from '@nestjs/common'; // Assumes you have PrismaService to manage Prisma Client
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword, // Save the hashed password
        },
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async getUser(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Hash password if it is being updated
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        // Exclude password by default
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
