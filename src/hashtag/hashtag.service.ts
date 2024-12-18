import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Hashtag } from '@prisma/client';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(private readonly prisma: PrismaService) {}

  async createHashtag(createHashtagDto: CreateHashtagDto): Promise<Hashtag> {
    try {
      return this.prisma.hashtag.create({
        data: {
          tag: createHashtagDto.tag,
          posts: {
            connect: createHashtagDto.postIds.map((postId) => ({ id: postId })),
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('tag')) {
        throw new ConflictException('Hashtag already exists');
      }
      throw error;
    }
  }

  async getHashtag(id: number): Promise<Hashtag> {
    return this.prisma.hashtag.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async updateHashtag(id: number, updateHashtagDto: UpdateHashtagDto): Promise<Hashtag> {
    return this.prisma.hashtag.update({
      where: { id },
      data: {
        tag: updateHashtagDto.tag,
        posts: {
          set: updateHashtagDto.postIds.map((postId) => ({ id: postId })),
        },
      },
    });
  }

  async deleteHashtag(id: number): Promise<Hashtag> {
    return this.prisma.hashtag.delete({
      where: { id },
    });
  }
}
