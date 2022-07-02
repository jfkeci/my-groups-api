import { Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { PostsModule } from './resources/posts/posts.module';
import { PrismaModule } from './utilities/prisma/prisma.module';
import { CommentsModule } from './resources/comments/comments.module';
import { PostTypesModule } from './resources/post-types/post-types.module';
import { PostLikesModule } from './resources/post-likes/post-likes.module';
import { CommunitiesModule } from './resources/communities/communities.module';
import { RouterModule } from '@nestjs/core';
import { routerConfig } from './utilities/config/router.config';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    PrismaModule,
    CommentsModule,
    PostTypesModule,
    PostLikesModule,
    CommunitiesModule,
    RouterModule.register(routerConfig),
  ],
})
export class AppModule {}
