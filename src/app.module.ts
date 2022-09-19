import { CommunityMembersModule } from './resources/community-members/community-members.module';
import { CommunitiesModule } from './resources/communities/communities.module';
import { LoggerMiddleware } from './utilities/middlewares/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommentsModule } from './resources/comments/comments.module';
import { PrismaModule } from './utilities/prisma/prisma.module';
import { routerConfig } from './utilities/config/router.config';
import { loggerConfig } from './utilities/config/logger.config';
import validation from './utilities/config/validation.config';
import { PostsModule } from './resources/posts/posts.module';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { AuthGuard } from './utilities/guards/auth.guard';
import { APP_FILTER, APP_GUARD, RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { PollOptionsModule } from './resources/poll-options/poll-options.module';
import { PollOptionVotesModule } from './resources/poll-option-votes/poll-option-votes.module';
import { EventUsersModule } from './resources/event-users/event-users.module';
import { CommunityUsersModule } from './community-users/community-users.module';
import { SearchModule } from './search/search.module';
import { PostLikesModule } from './post-likes/post-likes.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    PrismaModule,
    CommentsModule,
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
    ),
    PollOptionsModule,
    PollOptionVotesModule,
    EventUsersModule,
    CommunityUsersModule,
    SearchModule,
    PostLikesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
