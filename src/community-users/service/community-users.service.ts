import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CommunityUserDto } from '../dto/community-user.dto';

@Injectable()
export class CommunityUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async addUserToCommunity(data: CommunityUserDto) {
    const existingMember = await this.prisma.community_members.findFirst({
      where: data
    });

    if (existingMember) {
      throw new ConflictException('User is already a member of this community');
    }

    const user = await this.prisma.users.findUnique({
      where: { id: data.user }
    });

    if (!user) {
      throw new NotFoundException('No user found');
    }
    const community = await this.prisma.communities.findUnique({
      where: { id: data.community }
    });

    if (!community) {
      throw new NotFoundException('No community found');
    }

    const newMember = await this.prisma.community_members.create({
      data: {
        user: data.user,
        community: data.community
      }
    });

    if (!newMember) {
      throw new BadGatewayException('Failed to add user to community');
    }

    return newMember;
  }

  async removeUserFromCommunity(data: CommunityUserDto) {
    const existingMember = await this.prisma.community_members.findFirst({
      where: {
        ...data
      }
    });

    if (!existingMember) {
      throw new NotFoundException('User does not belong to this community');
    }

    await this.prisma.community_members.delete({
      where: {
        id: existingMember.id
      }
    });

    return existingMember;
  }
}
