import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { MessageModule } from './message/message.module';
import { HashtagModule } from './hashtag/hashtag.module';

@Module({
  imports: [UserModule, AuthModule, PostModule, MessageModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
