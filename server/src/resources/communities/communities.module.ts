import { Module } from '@nestjs/common';
import { CommunitiesService } from './service/communities.service';
import { CommunitiesController } from './controller/communities.controller';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
})
export class CommunitiesModule {}
