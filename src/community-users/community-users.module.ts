import { Module } from '@nestjs/common';
import { CommunityUsersService } from './service/community-users.service';
import { CommunityUsersController } from './controller/community-users.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';

@Module({
  controllers: [CommunityUsersController],
  providers: [CommunityUsersService],
  imports: [PrismaModule]
})
export class CommunityUsersModule {}
