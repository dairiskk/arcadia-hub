import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { Hashtag } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('hashtags')
@Controller('hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  @ApiOperation({ summary: 'Create hashtag' })
  @ApiResponse({ status: 201, description: 'The hashtag has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ schema: { example: { tag: 'example', postIds: [1, 2, 3] } } })
  async createHashtag(@Body() createHashtagDto: CreateHashtagDto): Promise<Hashtag> {
    return this.hashtagService.createHashtag(createHashtagDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get hashtag' })
  @ApiResponse({ status: 200, description: 'Hashtag retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getHashtag(@Param('id') id: number): Promise<Hashtag> {
    return this.hashtagService.getHashtag(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update hashtag' })
  @ApiResponse({ status: 200, description: 'The hashtag has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ schema: { example: { tag: 'updated-example', postIds: [1, 2, 3] } } })
  async updateHashtag(@Param('id') id: number, @Body() updateHashtagDto: UpdateHashtagDto): Promise<Hashtag> {
    return this.hashtagService.updateHashtag(id, updateHashtagDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete hashtag' })
  @ApiResponse({ status: 200, description: 'The hashtag has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteHashtag(@Param('id') id: number): Promise<Hashtag> {
    return this.hashtagService.deleteHashtag(id);
  }
}
