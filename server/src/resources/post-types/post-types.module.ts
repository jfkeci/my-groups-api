import { Module } from '@nestjs/common';
import { PostTypesService } from './service/post-types.service';
import { PostTypesController } from './controller/post-types.controller';

@Module({
  controllers: [PostTypesController],
  providers: [PostTypesService],
})
export class PostTypesModule {}
