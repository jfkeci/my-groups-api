import { Module } from '@nestjs/common';
import { AssetsService } from './service/assets.service';
import { AssetsController } from './controller/assets.controller';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService]
})
export class AssetsModule {}
