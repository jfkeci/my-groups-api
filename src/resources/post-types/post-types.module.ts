import { Module } from '@nestjs/common';
import { PostTypesService } from './service/post-types.service';
import { PostTypesController } from './controller/post-types.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [PostTypesController],
  providers: [PostTypesService]
})
export class PostTypesModule {}
