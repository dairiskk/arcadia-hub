import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
        receiverId: createMessageDto.receiverId,
      },
    });
  }

  async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      orderBy: {
        timestamp: 'asc',
      },
    });
  }

  async updateMessage(id: number, updateMessageDto: UpdateMessageDto, userId: number): Promise<Message> {
    return this.prisma.message.update({
      where: {
        id,
        senderId: userId,
      },
      data: {
        content: updateMessageDto.content,
      },
    });
  }

  async deleteMessage(id: number, userId: number): Promise<Message> {
    return this.prisma.message.delete({
      where: {
        id,
        senderId: userId,
      },
    });
  }
}
