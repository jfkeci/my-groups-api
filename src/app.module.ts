import { Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { PostsModule } from './resources/posts/posts.module';
import { CommentsModule } from './resources/comments/comments.module';
import { PostTypesModule } from './resources/post-types/post-types.module';
import { PostLikesModule } from './resources/post-likes/post-likes.module';
import { CommunitiesModule } from './resources/communities/communities.module';
import { RouterModule } from '@nestjs/core';
import { routerConfig } from './utilities/config/router.config';
import { PrismaModule } from './utilities/prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import validation from './utilities/config/validation.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    PrismaModule,
    CommentsModule,
    PostTypesModule,
    PostLikesModule,
    CommunitiesModule,
    RouterModule.register(routerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validation(),
    }),
  ],
})
export class AppModule {}
