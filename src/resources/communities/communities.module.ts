import { Module } from '@nestjs/common';
import { CommunitiesService } from './service/communities.service';
import { CommunitiesController } from './controller/communities.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
