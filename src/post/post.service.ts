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

  async findAllByUserId(userId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { authorId: userId },  // Filter posts by authorId (user ID)
      include: { author: false },    // Include author details if needed
    });
  }
  async findOneByUserIdAndPostId(userId: number, postId: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: {
        id: postId,        // Find post with the specific ID
        authorId: userId,  // Ensure it belongs to the user with the given userId
      },
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
