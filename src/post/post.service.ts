import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client'; // Import Post type from Prisma
import { CreatePostDto } from './dto/create-post.dto'; // Import DTO for creating a post
import { UpdatePostDto } from './dto/update-post.dto'; // Import DTO for updating a post
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        published: createPostDto.published,
        authorId: createPostDto.authorId,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { author: true }, // Include author details if needed
    });
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true }, // Include author details if needed
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
