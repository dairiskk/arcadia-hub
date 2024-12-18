import { Controller, Post, Body, Get, Param, Request, UseGuards, Put, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt')) // Protect this route
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  @ApiOperation({ summary: 'Send message' })
  @ApiResponse({ status: 201, description: 'The message has been successfully sent.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ schema: { example: { content: 'Hello!', receiverId: 2 } } })
  async sendMessage(@Body() createMessageDto: CreateMessageDto, @Request() req): Promise<Message> {
    createMessageDto.senderId = req.user.id;
    return this.messageService.sendMessage(createMessageDto);
  }

  @Get('/:receiverId')
  @ApiOperation({ summary: 'Get messages' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getMessages(
    @Param('receiverId') receiverId: number,
    @Request() req
  ): Promise<Message[]> {
    return this.messageService.getMessages(req.user.id, receiverId);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update message' })
  @ApiResponse({ status: 200, description: 'The message has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ schema: { example: { content: 'Updated message content' } } })
  async updateMessage(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
    @Request() req
  ): Promise<Message> {
    return this.messageService.updateMessage(id, updateMessageDto, req.user.id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete message' })
  @ApiResponse({ status: 200, description: 'The message has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteMessage(
    @Param('id') id: number,
    @Request() req
  ): Promise<Message> {
    return this.messageService.deleteMessage(id, req.user.id);
  }
}
