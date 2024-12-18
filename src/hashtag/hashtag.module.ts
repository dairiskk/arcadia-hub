import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { PrismaService } from 'src/prisma.service';
import { HashtagController } from './hashtag.controller';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService, PrismaService],
})
export class HashtagModule {}
