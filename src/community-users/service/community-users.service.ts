import {
  BadRequestException,
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
      throw new ConflictException('MYBcfe001');
    }

    const user = await this.prisma.users.findUnique({
      where: { id: data.user }
    });

    if (!user) {
      throw new NotFoundException('MYBnfe001');
    }
    const community = await this.prisma.communities.findUnique({
      where: { id: data.community }
    });

    if (!community) {
      throw new NotFoundException('MYBnfe003');
    }

    const newMember = await this.prisma.community_members.create({
      data: {
        user: data.user,
        community: data.community
      }
    });

    if (!newMember) {
      throw new BadRequestException('MYBbre001');
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
      throw new NotFoundException('MYBnfe006');
    }

    await this.prisma.community_members.delete({
      where: {
        id: existingMember.id
      }
    });

    return existingMember;
  }

  async getCommunityUsers(commnityId: number) {
    const community = await this.prisma.communities.findUnique({
      where: { id: commnityId },
      include: {
        community_members: {
          include: {
            users: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                image: true
              }
            }
          }
        }
      }
    });

    if (!community) throw new NotFoundException('noCommunityFound');

    if (community.community_members.length) {
      return community.community_members.map((cm) => ({
        ...cm.users,
        createdAt: cm.createdAt
      }));
    }

    return [];
  }
}
