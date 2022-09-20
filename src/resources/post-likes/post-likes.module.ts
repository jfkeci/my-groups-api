import { Module } from '@nestjs/common';
import { PostLikesService } from './service/post-likes.service';
import { PostLikesController } from './controller/post-likes.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';
import { UsersModule } from 'src/resources/users/users.module';

@Module({
  controllers: [PostLikesController],
  providers: [PostLikesService],
  imports: [PrismaModule, UsersModule]
})
export class PostLikesModule {}
