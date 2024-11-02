import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [UserModule, AuthModule, PostModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
