import { Module } from '@nestjs/common';
import { CommunityMembersService } from './service/community-members.service';
import { CommunityMembersController } from './controller/community-members.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommunityMembersController],
  providers: [CommunityMembersService]
})
export class CommunityMembersModule {}
