import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';
import { CommunityUsersService } from './service/community-users.service';
import { CommunityUsersController } from './controller/community-users.controller';

@Module({
  controllers: [CommunityUsersController],
  providers: [CommunityUsersService],
  imports: [PrismaModule]
})
export class CommunityUsersModule {}
