import { Module } from '@nestjs/common';
import { SearchService } from './service/search.service';
import { SearchController } from './controller/search.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
