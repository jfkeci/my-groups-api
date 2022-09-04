import { Module } from '@nestjs/common';
import { PostsService } from './service/posts.service';
import { PostsController } from './controller/posts.controller';
import { UsersModule } from '../users/users.module';
import { CommunitiesModule } from '../communities/communities.module';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, CommunitiesModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
