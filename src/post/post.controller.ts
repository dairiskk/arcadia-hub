import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto'; // Import DTO for creating a post
import { UpdatePostDto } from './dto/update-post.dto'; // Import DTO for updating a post
import { Post as PostEntity } from '@prisma/client'; // Import Post type from Prisma
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('posts')
@UseGuards(AuthGuard('jwt')) // Protect this route
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ schema: { example: { title: 'Post Title', content: 'Post content', published: true } } })
  async create(@Body() createPostDto: CreatePostDto, @Request() req): Promise<PostEntity> {
    createPostDto.authorId = req.user.id
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts by user' })
  @ApiResponse({ status: 200, description: 'Return all posts by user.' })
  async findAll(@Request() req): Promise<PostEntity[]> {
    return this.postService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiResponse({ status: 200, description: 'Return post by ID.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async findOne(@Param('id') id: string, @Request() req): Promise<PostEntity> {
    return await this.postService.findOneByUserIdAndPostId(req.user.id, Number(id));

  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiBody({ schema: { example: { title: 'Updated Title', content: 'Updated content', published: false } } })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postService.update(Number(id), updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async remove(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.remove(Number(id));
  }
}
