import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';

@Injectable()
export class CommunityMembersService {
  constructor(private readonly prisma: PrismaService) {}

  async addMemberToCommunity(userId: number, communityId: number) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('No user found');

    const community = await this.prisma.communities.findUnique({
      where: { id: communityId }
    });

    if (!community) throw new NotFoundException('No community found');

    const membership = await this.prisma.community_members.create({
      data: {
        user: userId,
        community: communityId
      }
    });

    if (!membership) {
      throw new BadRequestException('Failed to add user to community');
    }

    return membership;
  }

  async getCommunityMembers(communityId: number) {
    const community = await this.prisma.communities.findUnique({
      where: { id: communityId },
      include: {
        community_members: {
          include: {
            users: {
              select: {
                username: true,
                firstName: true,
                lastName: true,
                birthdate: true,
                createdAt: true
              }
            }
          }
        }
      }
    });

    if (!community) {
      throw new NotFoundException('No community found');
    }

    return community;
  }

  async removeMemberFromCommunity(userId: number, communityId: number) {
    const membership = await this.prisma.community_members.findFirst({
      where: {
        user: userId,
        community: communityId
      }
    });

    if (!membership) {
      throw new NotFoundException('User is not a member of this community');
    }

    await this.prisma.community_members.delete({
      where: { id: membership.id }
    });
  }
}
