import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { PostsModule } from './resources/posts/posts.module';
import { CommentsModule } from './resources/comments/comments.module';
import { PostTypesModule } from './resources/post-types/post-types.module';
import { PostLikesModule } from './resources/post-likes/post-likes.module';
import { CommunitiesModule } from './resources/communities/communities.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { routerConfig } from './utilities/config/router.config';
import { PrismaModule } from './utilities/prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import validation from './utilities/config/validation.config';
import { AuthGuard } from './utilities/guards/auth.guard';
import { CommunityMembersModule } from './resources/community-members/community-members.module';
import { AppController } from './app.controller';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './utilities/config/logger.config';
import { LoggerMiddleware } from './utilities/middlewares/logger.middleware';

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
    CommunityMembersModule,
    RouterModule.register(routerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validation()
    }),
    WinstonModule.forRoot(
      loggerConfig(process.env.LOG_LEVEL, process.env.NODE_ENV, {
        frequency: process.env.LOG_FREQUENCY,
        maxFiles: process.env.LOG_MAX_FILES,
        maxSize: process.env.LOG_MAX_FILE_SIZE
      })
    )
  ],
  providers: [
    /* {
      provide: APP_GUARD,
      useClass: AuthGuard
    } */
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
