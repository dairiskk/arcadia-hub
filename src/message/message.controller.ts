import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from '@prisma/client';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  async sendMessage(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.sendMessage(createMessageDto);
  }

  @Get(':senderId/:receiverId')
  async getMessages(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number
  ): Promise<Message[]> {
    return this.messageService.getMessages(senderId, receiverId);
  }
}
