import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto'; // Import DTO for creating a post
import { UpdatePostDto } from './dto/update-post.dto'; // Import DTO for updating a post
import { Post as PostEntity } from '@prisma/client'; // Import Post type from Prisma
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) // Protect this route
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Request() req): Promise<PostEntity> {
    createPostDto.authorId = req.user.id
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll(@Request() req): Promise<PostEntity[]> {
    return this.postService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<PostEntity> {
    return await this.postService.findOneByUserIdAndPostId(req.user.id, Number(id));

  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updatePostDto: UpdatePostDto,
  // ): Promise<PostEntity> {
  //   return this.postService.update(Number(id), updatePostDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<PostEntity> {
  //   return this.postService.remove(Number(id));
  // }
}
