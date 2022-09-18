import { Module } from '@nestjs/common';
import { CommentsService } from './service/comments.service';
import { CommentsController } from './controller/comments.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
