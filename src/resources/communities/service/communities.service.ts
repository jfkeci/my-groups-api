import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async createOne(data: CreateCommunityDto) {
    const user = await this.userService._findUnique({
      id: Number(data.createdBy)
    });

    if (!user) throw new NotFoundException('No user found');

    const community = await this.prisma.communities.create({ data });

    if (!community) throw new BadRequestException('Failed to create community');

    await this.prisma.communityMembers.create({
      data: {
        community: community.id,
        user: data.createdBy
      }
    });

    return community;
  }

  async findMany(query) {
    const communities = await this.prisma.communities.findMany({
      where: query
    });

    if (!communities || !communities.length) {
      throw new NotFoundException('No communities found');
    }

    return communities;
  }

  async updateOne(query, data: UpdateCommunityDto) {
    const community = await this.prisma.communities.update({
      where: query,
      data
    });

    if (!community) throw new BadRequestException('Failed to update community');

    return community;
  }

  async deleteOne(query) {
    const community = await this.prisma.communities.delete({ where: query });

    if (!community) throw new BadRequestException('Failed to delete community');

    return community;
  }

  async getCommunityUsers(communityId: number) {
    const community = await this.prisma.communities.findUnique({
      where: { id: communityId },
      include: {
        communityMembers: {
          include: {
            users: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                image: true
              }
            }
          }
        }
      }
    });

    if (!community) throw new NotFoundException('No community found');

    return community;
  }

  async findUnique(query) {
    const community = await this.prisma.communities.findUnique({
      where: query
    });

    if (!community) throw new BadRequestException('No community found');

    return community;
  }

  async _update(query, data: UpdateCommunityDto) {
    return await this.prisma.communities.update({ where: query, data });
  }

  async _updateMany(query, data: UpdateCommunityDto) {
    return await this.prisma.communities.updateMany({ where: query, data });
  }

  async _delete(query) {
    return await this.prisma.communities.delete({ where: query });
  }

  async _deleteMany(query) {
    return await this.prisma.communities.deleteMany({ where: query });
  }

  async _findMany(query) {
    return await this.prisma.communities.findMany({ where: query });
  }

  async _findFirst(query) {
    return await this.prisma.communities.findFirst({ where: query });
  }

  async _findUnique(query) {
    return await this.prisma.communities.findUnique({ where: query });
  }
}
